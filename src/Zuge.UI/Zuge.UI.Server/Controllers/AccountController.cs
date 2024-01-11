using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Specifications;
using Zuge.Domain.Types.Authentication;

namespace Zuge.UI.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController(IAuthUnitOfWork unitOfWork) : ControllerBase
    {
        [HttpGet("{email}")]
        public async Task<IActionResult> OnGetByEmailAsync(string email)
        {
            var account = await unitOfWork.Repository<UserAccount>().FirstOrNull(new WhereEmailAccountSpecification(email));
            
            if (account == null) return NotFound();
            
            return Ok(account);
        }

        [HttpPost]
        public async Task<IActionResult> OnPostAsync([FromForm] RegistrationInformation info)
        {
            var trimmedInfo = new RegistrationInformation(
                info.FirstName.Trim(),
                info.LastName.Trim(),
                info.Email.Trim(),
                info.Password.Trim(),
                info.PhoneNumber?.Trim());

            if (!TryValidateModel(trimmedInfo)) return BadRequest();
            
            var repo = unitOfWork.Repository<UserAccount>();

            if (await repo.FirstOrNull(new WhereEmailAccountSpecification(trimmedInfo.Email)) != null) return BadRequest("Email is already in use.");

            Guid accountId = Guid.NewGuid();
            Guid passwordSalt = Guid.NewGuid();
            
            var passwordHash = Encoding.UTF8.GetString(SHA256.HashData(Encoding.UTF8.GetBytes(passwordSalt + info.Password)));
            var newAccount = new UserAccount(accountId, trimmedInfo.FirstName, trimmedInfo.LastName, trimmedInfo.Email, 
                trimmedInfo.PhoneNumber, new UserLoginData(accountId, passwordSalt, passwordHash, trimmedInfo.Email, null));
            repo.AddRange(new List<UserAccount>()
            {
                newAccount
            });
            await unitOfWork.CommitAsync();
            return Ok("Added new account with email: " + trimmedInfo.Email);
        }
    }
}
