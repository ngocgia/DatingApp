using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
     public interface IReportRepository
    {
        void AddReport(Reports reports);
        void DeleteReport(Reports reports);
        Task<Reports> GetReport(int id);
        Task<PagedList<Reports>> GetAllReport(PaginationParams paginationParams);
    }
}