
using System;
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
    public class ReportRepository : IReportRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReportRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        public void AddReport(Reports reports)
        {
            _context.Reports.Add(reports);
            _context.SaveChanges();
        }

        public void DeleteReport(Reports report)
        {
             _context.Reports.Remove(report);
        }

        public async Task<PagedList<Reports>> GetAllReport(PaginationParams paginationParams)
        {
            var query = _context.Reports
                .OrderByDescending(m => m.Id)
                .AsQueryable();

            var reports = query.Select(report => new Reports
            {
                Id = report.Id,
                SenderReportId = report.SenderReportId,
                RecipientReportId = report.RecipientReportId,
                SenderReportName = report.SenderReportName,
                RecipientReportName = report.RecipientReportName,
                Reason = report.Reason,
                ReportDate = DateTime.UtcNow
            });

            return await PagedList<Reports>.CreateAsync(reports, paginationParams.PageNumber, paginationParams.PageSize);
        }


        public async Task<Reports> GetReport(int id)
        {
              return await _context.Reports
                .Include(u => u.SenderReport)
                .Include(u => u.RecipientReport)
                .SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}