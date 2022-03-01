using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IBlocksRepository
    {
         Task<UserBlocks> GetUserBlocks(int sourceUserId, int blockedUserId);
         Task<AppUser> GetUserWithBlock(int userId);
         Task<PagedList<BlockDto>> GetUserBlocks(BlocksParam blocksParam);
    }
}