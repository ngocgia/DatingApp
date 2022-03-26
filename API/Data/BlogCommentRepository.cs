using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BlogCommentRepository : IBlogCommentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BlogCommentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddComment(BlogComment blogComment)
        {
            _context.BlogComments.Add(blogComment);
            _context.SaveChanges();
        }

        public void DeleteCommentAsync(int blogCommentId)
        {
            BlogComment blogComment = (BlogComment)_context.BlogComments.Where(c => c.BlogCommentId == blogCommentId).First();
            _context.BlogComments.Remove(blogComment);
        }

        public List<CommentDto> GetAllCommentAsync(int blogId)
        {
            return _context.BlogComments
                        .Where(x => x.BlogsId.Equals(blogId))
                        .OrderByDescending(x => x.BlogCommentId)
                        .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                        .ToList();
        }
        public async Task<PagedList<CommentDto>> GetAllComments(PaginationParams paginationParams)
        {
            var query = _context.BlogComments
                .OrderByDescending(m => m.BlogCommentId)
                .AsQueryable();

            var comments = query.Select(comment => new CommentDto
            {
                BlogCommentId = comment.BlogCommentId,
                BlogsId = comment.BlogsId,
                Content = comment.Content,
                Username = comment.Username,
                PublishDate = comment.PublishDate,
                AppUserId = comment.AppUserId
            });

            return await PagedList<CommentDto>.CreateAsync(comments, paginationParams.PageNumber, paginationParams.PageSize);
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