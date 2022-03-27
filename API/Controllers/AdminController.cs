using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoService _photoService;
        public AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, 
            IPhotoService photoService)
        {
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        // [Authorize(Policy = "RequireAdminRole")]
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public async Task<ActionResult> GetPhotosForModeration()
        {
            var photos = await _unitOfWork.PhotoRepository.GetUnapprovedPhotos();

            return Ok(photos);
        }

        // [Authorize(Policy = "RequireAdminRole")]
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approve-photo/{photoId}")]
        public async Task<ActionResult> ApprovePhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            if (photo == null) return NotFound("Could not find photo");

            photo.IsApproved = true;

            var user = await _unitOfWork.UserRepository.GetUserByPhotoId(photoId);

            if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("reject-photo/{photoId}")]
        public async Task<ActionResult> RejectPhoto(int photoId)
        {
            var photo = await _unitOfWork.PhotoRepository.GetPhotoById(photoId);

            if (photo == null) return NotFound("Could not find photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Result == "ok")
                {
                    _unitOfWork.PhotoRepository.RemovePhoto(photo);
                }
            }
            else
            {
                _unitOfWork.PhotoRepository.RemovePhoto(photo);
            }

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("delete-user/{username}")]
        public async Task<ActionResult> DeleteUser(string username)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

            if(user == null) return BadRequest("Not found user");
            if(user != null)
            {
                 _unitOfWork.UserRepository.Remove(user);
                 await _unitOfWork.Complete();
                 return Ok();
            }
            return BadRequest("Delete error");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("blogs-to-moderate")]
        public async Task<ActionResult> GetBlogsForModeration()
        {
            var blogs = await _unitOfWork.BlogsRepository.GetUnapprovedBlogs();

            return Ok(blogs);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approve-blog/{blogId}")]
        public async Task<ActionResult> ApproveBlog(int blogId)
        {
            var blog = await _unitOfWork.BlogsRepository.GetBlogId(blogId);

            if (blog == null) return NotFound("Could not find blog");

            blog.IsApproved = true;

            // var user = await _unitOfWork.UserRepository.GetUserByPhotoId(photoId);

            // if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("reject-blog/{blogId}")]
        public async Task<ActionResult> RejectBlog(int blogId)
        {
            var blog = await _unitOfWork.BlogsRepository.GetBlogId(blogId);

            if (blog == null){
                return NotFound("Could not find blogs");
            } else {
                _unitOfWork.BlogsRepository.DeleteBlog(blog);
            }
            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpDelete("delete-blog/{blogId}")]
        public async Task<ActionResult> DeleteBlog(int blogId)
        {
           var blog = await _unitOfWork.BlogsRepository.GetBlogId(blogId);

            if (blog == null){
                return NotFound("Could not find blogs");
            } else {
                _unitOfWork.BlogsRepository.DeleteBlog(blog);
            }
            await _unitOfWork.Complete();

            return Ok();
        }
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpDelete("delete-comment/{blogCommentId}")]
        public async Task<ActionResult> DeleteComment(int blogCommentId)
        {
           var blogComment = await _unitOfWork.BlogCommentRepository.GetCommentAsync(blogCommentId);

            if (blogComment == null){
                return NotFound("Could not find blogs");
            } else {
                _unitOfWork.BlogCommentRepository.DeleteCommentAsync(blogCommentId);
            }
            await _unitOfWork.Complete();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]   
        [HttpGet("report")]
        public async Task<ActionResult<IEnumerable<ReportedUser>>> GetAllReportedUser([FromQuery] PaginationParams paginationParams)
        {

            var reportedUser = await _unitOfWork.ReportRepository.GetAllReportedUser(paginationParams);

            Response.AddPaginationHeader(reportedUser.CurrentPage,
                reportedUser.PageSize, reportedUser.TotalCount, reportedUser.TotalPages);

            return Ok(reportedUser);
        }
    }
}