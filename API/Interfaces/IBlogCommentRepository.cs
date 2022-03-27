using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
     public interface IBlogCommentRepository
     {
        void AddComment(BlogComment blogComment);
        void DeleteCommentAsync(int blogCommentId);
        void UpdateCommnetAsync(BlogComment blogComment, int appUserId);
        List<CommentDto> GetAllCommentAsync(int blogId);
        Task<BlogComment> GetCommentAsync(int blogCommentId);
        Task<PagedList<CommentDto>> GetAllComments(PaginationParams paginationParams);
     }
}