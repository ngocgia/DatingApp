namespace API.Helpers
{
    public class BlocksParam : PaginationParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
    }
}