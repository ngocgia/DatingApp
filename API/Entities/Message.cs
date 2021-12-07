using System;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public AppUser Sender { get; set; }
        public int RecipientId { get; set; }  // id người nhận
        public string  RecipientUsername { get; set; } //username người nhận
        public AppUser Recipient { get; set; } //người nhận
        public string Content { get; set; } // nội dung
        public DateTime? DateRead { get; set; } 
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; } //người nhận đã xóa
    }

}