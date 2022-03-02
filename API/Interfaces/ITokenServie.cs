using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Google.Apis.Auth;

namespace API.Interfaces
{
    public interface ITokenService
    {
       Task<string> CreateToken(AppUser user);
       Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(GoogleAuthDto googleAuth);
    }
}