using System;

namespace API.Entities
{
    public class Reports
    {
        public int Id { get; set; }
        public int SenderReportId { get; set; }
        public string SenderReportName { get; set; }
        public string Reason { get; set; }
        public DateTime ReportDate { get; set; }    
        public AppUser SenderReport { get; set; }
        public int RecipientReportId { get; set; }
        public string RecipientReportName { get; set; }
        public AppUser RecipientReport { get; set; }
    }
}