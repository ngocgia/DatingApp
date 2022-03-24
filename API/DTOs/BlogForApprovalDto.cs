namespace API.DTOs
{
    public class BlogForApprovalDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }  
        public string Username { get; set; }
        public bool IsApproved { get; set; }
    }
}