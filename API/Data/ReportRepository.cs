using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Data
{
    public class ReportRepository : IReportRepository
    {

        private readonly DataContext _context;
        public ReportRepository(DataContext context)
        {
            _context = context;
        }

       public async Task<PagedList<ReportedUser>> GetAllReportedUser(PaginationParams paginationParams)
        {
            var query = _context.ReportedUsers
                .OrderByDescending(m => m.Id)
                .AsQueryable();

            var reported = query.Select(report => new ReportedUser
            {
              Id = report.Id,
              Username = report.Username,
              AppUserId = report.AppUserId,
            //   Reported = report.Reported,

            });

            return await PagedList<ReportedUser>.CreateAsync(reported, paginationParams.PageNumber, paginationParams.PageSize);
        }
        public List<Report> GetAllReportAsync(int reportedUserId)
        {
            return _context.Reports
                        .Where(x => x.ReportedUsersId.Equals(reportedUserId))
                        .OrderByDescending(x => x.Id)
                        .ToList();
        }
        // public List<Report> GetAllReportAsync(int AppUserId)
        // {
        //     return _context.Reports
        //                 .Where(x => x.ReportedUsersId.Equals(AppUserId))
        //                 .OrderByDescending(x => x.Id)
        //                 .ToList();
        // }
        public void AddReport(Report report)
        {
            _context.Reports.Add(report);
            _context.SaveChanges();
        }
    }
}