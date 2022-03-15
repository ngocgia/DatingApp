using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BlogCommentRepository : IBlogCommentRepository
    {
        private readonly DataContext _context;
        public BlogCommentRepository(DataContext context)
        {
            _context = context;
        }

        public void AddComment(BlogComment blogComment)
        {
            _context.BlogComments.Add(blogComment);
            _context.SaveChanges();
        }

        public void DeleteCommentAsync(int blogCommentId)
        {
            BlogComment blogComment =(BlogComment) _context.BlogComments.Where(c => c.BlogCommentId == blogCommentId).First();
            _context.BlogComments.Remove(blogComment);
        }

        public List<BlogComment> GetAllCommentAsync(int blogId)
        {
            return _context.BlogComments
                        .Where(x => x.BlogsId.Equals(blogId))
                        .OrderByDescending(x => x.BlogCommentId)
                        .Select(x => new BlogComment
                        {
                            BlogCommentId = x.BlogCommentId,
                            ParentBlogCommentId = x.ParentBlogCommentId,
                            BlogsId = x.BlogsId,
                            Content = x.Content,
                            Username = x.Username,
                            AppUserId = x.AppUserId,
                            PublishDate = x.PublishDate,
                            UpdateDate = x.UpdateDate
                        }).ToList();
        }

        public async Task<BlogComment> GetCommentAsync(int blogCommentId)
        {
            return await _context.BlogComments.FindAsync(blogCommentId);
        }

        public void UpdateCommnetAsync(BlogComment blogComment, int appUserId)
        {
              _context.Entry(blogComment).State = EntityState.Modified;
        }
    }
}