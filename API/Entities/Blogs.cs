using System;

namespace API.Entities
{
    public class Blogs
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public int AppUserId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int? PhotoId { get; set; }
     

    }
}