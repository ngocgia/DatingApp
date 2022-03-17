using System;

namespace API.DTOs
{
    public class CommentDto
    {
        public int BlogCommentId { get; set; }
        public int BlogsId { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int AppUserId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string userPhotoUrl { get; set; }
       
    
    }
}