using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BlocksRepository : IBlocksRepository
    {
        private readonly DataContext _context;
        public BlocksRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserBlocks> GetUserBlocks(int sourceUserId, int blockedUserId)
        {
            return await _context.Blocks.FindAsync(sourceUserId, blockedUserId);
        }

        public async Task<PagedList<BlockDto>> GetUserBlocks(BlocksParam blocksParam)
        {
            var user = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var blocks = _context.Blocks.AsQueryable();

            if(blocksParam.Predicate == "blocked")
            {
                blocks = blocks.Where(block => block.SourceUserId == blocksParam.UserId);
                user = blocks.Select(block => block.BlockedUser);
            }

            if(blocksParam.Predicate == "blockedBy")
            {
                blocks = blocks.Where(block => block.BlockedUserId == blocksParam.UserId);
                user = blocks.Select(like => like.SourceUser);
            }

            var blockedUsers = user.Select(user => new BlockDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Id = user.Id,
            });

            return await PagedList<BlockDto>.CreateAsync(blockedUsers, blocksParam.PageNumber, blocksParam.PageSize);
        }

        public async Task<AppUser> GetUserWithBlock(int userId)
        {
            return await _context.Users
                .Include(x => x.BlockedUser)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}