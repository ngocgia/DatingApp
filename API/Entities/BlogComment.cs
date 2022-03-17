using System;
using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class BlogComment
    {
        [Key]
        public int BlogCommentId { get; set; }
        public int? ParentBlogCommentId { get; set; }
        public int BlogsId { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int AppUserId { get; set; }
        public DateTime PublishDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; }
        public Blogs Blogs { get; set; }


    }
}