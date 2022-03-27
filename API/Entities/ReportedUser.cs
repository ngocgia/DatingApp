using System.Collections.Generic;

namespace API.Entities
{
    public class ReportedUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int AppUserId { get; set; }
        // public AppUser Reported { get; set; }
        public ICollection<Report> Reports { get; set; }
    }
}