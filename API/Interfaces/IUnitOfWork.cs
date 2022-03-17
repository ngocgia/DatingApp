using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILikesRepository LikesRepository { get; }
        IBlocksRepository BlocksRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IBlogsRepository BlogsRepository { get; }
        IBlogCommentRepository BlogCommentRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}