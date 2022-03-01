using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class BlocksController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public BlocksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddBlock(string username)
        {
                var sourceUserId = User.GetUserId();
                var blockedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
                var sourceUser = await _unitOfWork.BlocksRepository.GetUserWithBlock(sourceUserId);

                if (blockedUser == null) return NotFound();

                if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

                var userBlock = await _unitOfWork.BlocksRepository.GetUserBlocks(sourceUserId, blockedUser.Id);

                if (userBlock != null) return BadRequest("You already like this user");

                userBlock = new UserBlocks
                {
                    SourceUserId = sourceUserId,
                    BlockedUserId = blockedUser.Id
                };

                sourceUser.BlockedUser.Add(userBlock);

                if (await _unitOfWork.Complete()) return Ok();
            
            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _unitOfWork.LikesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(users.CurrentPage,
                users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}