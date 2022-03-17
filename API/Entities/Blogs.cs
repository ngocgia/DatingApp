using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Blogs
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public int AppUserId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public ICollection<BlogComment> BlogComments { get; set; }

    }
}