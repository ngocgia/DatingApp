namespace API.Helpers
{
    public class BlogsParams : PaginationParams
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Predicate { get; set; }
    }
}