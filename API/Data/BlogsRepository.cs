using System;
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
    public class BlogsRepository : IBlogsRepository
    {
        private readonly DataContext _context;
        // private readonly IMapper _mapper;
        public BlogsRepository(DataContext context)
        {
            // _mapper = mapper;
            _context = context;
        }

        public void AddBlog(Blogs blogs)
        {
            _context.Blogs.Add(blogs);
            _context.SaveChanges();
        }

        public void DeleteBlog(Blogs blogs)
        {
            _context.Blogs.Remove(blogs);
        }

        public List<Blogs> GetAllBlogByUserName(string username)
        { 
            return _context.Blogs
                .Where(x => x.UserName.Equals(username))
                .OrderByDescending(x => x.Id)
                .Select(blog => new Blogs
                {
                    UserName = blog.UserName,
                    Title = blog.Title,
                    Content = blog.Content,
                    UpdateDate = blog.UpdateDate,
                    PublishDate = blog.PublishDate,
                    AppUserId = blog.AppUserId,
                    PhotoId = blog.PhotoId,
                    Id = blog.Id,
                }).ToList();
        }

        public async Task<PagedList<Blogs>> GetAllBlogs(PaginationParams paginationParams)
        {
            var query = _context.Blogs
                .OrderByDescending(m => m.Id)
                .AsQueryable();

            var blogs = query.Select(blog => new Blogs
            {
                UserName = blog.UserName,
                Title = blog.Title,
                Content = blog.Content,
                UpdateDate = blog.UpdateDate,
                PublishDate = blog.PublishDate,
                AppUserId = blog.AppUserId,
                PhotoId = blog.PhotoId,
                Id = blog.Id,
            });

            return await PagedList<Blogs>.CreateAsync(blogs, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public Task<List<Blogs>> GetAllFamousAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Blogs> GetBlogId(int id)
        {
            return await _context.Blogs
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public void UpsertAsync(Blogs blogs, int appUserId)
        {
             _context.Entry(blogs).State = EntityState.Modified;
        }
    }
}