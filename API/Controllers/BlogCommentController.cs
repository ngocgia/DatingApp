using System;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class BlogCommentController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public BlogCommentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{blogId}")]
        public async Task<ActionResult<BlogComment>> GetAllBlogComment(int blogId)
        {
            var blogComment = _unitOfWork.BlogCommentRepository.GetAllCommentAsync(blogId);
            if(blogComment != null)
            {
                return Ok(blogComment);
            }
            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Sai roi kia!");
            // return Ok(blogComment);
        }
        [HttpPost]
        public async Task<ActionResult<BlogComment>> Create(BlogComment blogComment)
        {
           try
            {
                var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
                var newComment = new BlogComment
                {
                    BlogCommentId = blogComment.BlogCommentId,
                    ParentBlogCommentId = blogComment.ParentBlogCommentId,
                    BlogsId = blogComment.BlogsId,
                    Content = blogComment.Content,
                    Username = user.UserName,
                    AppUserId = user.Id,
                    PublishDate = DateTime.Now,
                    // UpdateDate = DateTime.Now
                    
                };
                _unitOfWork.BlogCommentRepository.AddComment(newComment);
                return Ok();
            }
            catch (System.Exception)
            {
                
                return BadRequest("sai roi");
            }
        }

         [HttpDelete("{blogCommentId}")]
         public async Task<ActionResult> DeleteComment(int blogCommentId)
         {
             var username = User.GetUsername();

            var comment = await _unitOfWork.BlogCommentRepository.GetCommentAsync(blogCommentId);

            if (comment.Username != username )
                return Unauthorized();

            if (comment.Username == username)
            {
                _unitOfWork.BlogCommentRepository.DeleteCommentAsync(blogCommentId);
            }

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the Comment");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateComment(BlogComment blogComment, int appUserId)
        {

            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
            if(blogComment.AppUserId == user.Id)
            {
                _unitOfWork.BlogCommentRepository.UpdateCommnetAsync(blogComment, blogComment.AppUserId);
            }

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update COMMENT");
        }



    }
}