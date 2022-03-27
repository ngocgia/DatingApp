using System;

namespace API.Entities
{
    public class Report
    {
        public int Id { get; set; }
        public int ReportedUsersId { get; set; } 
        public int AppUserId { get; set; }
        public string Username { get; set; }
        public string Reason { get; set; }
        public DateTime ReportDate { get; set; } = DateTime.UtcNow;
        // public AppUser ReportsUser { get; set; }
        public ReportedUser ReportedUsers { get; set; }

    }
}