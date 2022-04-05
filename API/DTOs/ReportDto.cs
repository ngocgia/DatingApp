using System;

namespace API.DTOs
{
    public class ReportDto
    {
        public int Id { get; set; }
        public int SenderReportId { get; set; } 
        public string SenderReportName { get; set; } 
        public int RecipientReportId { get; set; }  
        public string  RecipientReportName { get; set; } 
        public string Reason { get; set; }
        public DateTime ReportDate { get; set; }

    }
}