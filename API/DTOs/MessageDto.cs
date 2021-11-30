using System;

namespace API.DTOs
{
    public class MessageDto
    {
          public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }  // id người nhận
        public string  RecipientUsername { get; set; } //username người nhận
        public string RecipientPhotoUrl { get; set; } 
        public string Content { get; set; } // nội dung
        public DateTime? DateRead { get; set; } 
        public DateTime MessageSent { get; set; } 
    }
}