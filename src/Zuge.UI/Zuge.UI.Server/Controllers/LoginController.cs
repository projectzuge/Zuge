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
    public class LoginController(IAuthUnitOfWork unitOfWork) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> OnPostAsync([FromBody] LoginDetails loginDetails)
        {
            if (!TryValidateModel(loginDetails)) return BadRequest();

            var account = await unitOfWork.Repository<UserAccount>().FirstOrNull(new WhereEmailAccountSpecification(loginDetails.Email.Trim()));
            if (account == null) return NotFound();

            var loginData = await unitOfWork.Repository<UserLoginData>().FirstOrNull(new WhereIdLoginDataSpecification(account.Id));
            var passwordHash = SHA256.HashData(Encoding.UTF8.GetBytes(loginData!.PasswordSalt + loginDetails.Password.Trim()));
            string pass = ""; // väliaikainen räpellys koska encoding getstring palauttaa jotain sekavaa dataa
                              // Tarkoitus ottaa aspnetcore Identity kirjasto käyttöön myöhemmin
            foreach (var item in passwordHash)
            {
                pass += item;
            }
            if (loginData.PasswordHash != pass) return BadRequest("Invalid password");

            return Ok("Successfully logged in"); // myöhemmin palauttaa JWTn?
        }
    }
}
