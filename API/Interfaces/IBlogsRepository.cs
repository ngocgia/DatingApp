using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IBlogsRepository
    {
        Task<PagedList<Blogs>> GetAllBlogByUserId(BlogsParams blogsParams);
        Task<Blogs> GetBlogId(int id);
        Task<PagedList<Blogs>> GetAllBlogs(PaginationParams paginationParams);
        void AddBlog(Blogs blogs);
        void DeleteBlog(Blogs blogs);
        void UpsertAsync(Blogs blogs, int appUserId);
        Task<List<Blogs>> GetAllFamousAsync();
    }
}