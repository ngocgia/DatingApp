using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class BlogsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public BlogsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult> AddBlog(Blogs blogs)
        {
            try
            {
                var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
                var newBlog = new Blogs
                {
                    UserName = user.UserName,
                    Title = blogs.Title,
                    Content = blogs.Content,
                    UpdateDate = DateTime.UtcNow,
                    PublishDate = DateTime.Now,
                    AppUserId = user.Id,
                };
                _unitOfWork.BlogsRepository.AddBlog(newBlog);
                return Ok();
            }
            catch (System.Exception)
            {
                
                return BadRequest("sai roi");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Blogs>> GetBlogId(int id)
        {
            var blog = await _unitOfWork.BlogsRepository.GetBlogId(id);
            if(blog == null) return BadRequest("Not found");
            if (await _unitOfWork.Complete()) return Ok(blog);
            if(blog != null) return Ok(blog);
             return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blogs>>> GetAllBlogs([FromQuery] PaginationParams paginationParams)
        {

            var blogs = await _unitOfWork.BlogsRepository.GetAllBlogs(paginationParams);

            Response.AddPaginationHeader(blogs.CurrentPage,
                blogs.PageSize, blogs.TotalCount, blogs.TotalPages);

            return Ok(blogs);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBlog(Blogs blogs, int appUserId)
        {

            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
            if(blogs.AppUserId == user.Id)
            {
                _unitOfWork.BlogsRepository.UpsertAsync(blogs, blogs.AppUserId);
            }

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update blog");
        }
        [HttpGet("user/{username}")]
        public async Task<ActionResult<Blogs>> GetBlogByUserName(string username)
        {
            var blogUsername = _unitOfWork.BlogsRepository.GetAllBlogByUserName(username);
            if(blogUsername != null)
            {
                return Ok(blogUsername);
            }
            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Sai roi kia!");
        }

        [HttpDelete("{id}")]
         public async Task<ActionResult> DeleteBlog(int id)
         {
             var username = User.GetUsername();

            var blog = await _unitOfWork.BlogsRepository.GetBlogId(id);

            if (blog.UserName != username )
                return Unauthorized();

            if (blog.UserName == username)
            {
                _unitOfWork.BlogsRepository.DeleteBlog(blog);
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the message");
        }


    }
}