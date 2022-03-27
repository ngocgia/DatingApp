using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IReportRepository
    {
         Task<PagedList<ReportedUser>> GetAllReportedUser(PaginationParams paginationParams);
    }
}