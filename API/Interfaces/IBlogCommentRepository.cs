using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
     public interface IBlogCommentRepository
     {
        void AddComment(BlogComment blogComment);
        void DeleteCommentAsync(int blogCommentId);
        void UpdateCommnetAsync(BlogComment blogComment, int appUserId);
        List<BlogComment> GetAllCommentAsync(int blogId);
        Task<BlogComment> GetCommentAsync(int blogCommentId);
     }
}