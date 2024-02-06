using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Specifications;
using Zuge.Domain.Types.Authentication;
using Zuge.Infrastructure.Auth;
using Zuge.Infrastructure.Auth.Entities;

namespace Zuge.UI.Server.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController(AuthenticationDbContext authenticationDbContext, ApplicationUserManager userManager) : ControllerBase
    {
        private readonly AuthenticationDbContext _authenticationDbContext = authenticationDbContext;
        private readonly ApplicationUserManager _userManager = userManager;

        [HttpGet]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> OnGetAsync()
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return NotFound("This should not happen");
            var roles = await _userManager.GetRolesAsync(appUser);

            return Ok(new { appUser.Email, appUser.FirstName, appUser.LastName, appUser.PhoneNumber, roles });
        }
        [HttpGet]
        [Route("authorize")]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> OnGetAuthAsync()
        {
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null) return NotFound("This should not happen");
            var roles = await _userManager.GetRolesAsync(appUser);
            var userId = await _userManager.GetUserIdAsync(appUser);
            return Ok(new { roles, userId });
        }

        [HttpPost]
        [Route("manage/register")]
        public async Task<IActionResult> OnPostAsync([FromBody] RegistrationInformation info, [FromQuery] string email)
        {
            var user = _authenticationDbContext.Users.FirstOrDefault(user => user.Email == email);
            if (user == null) return NotFound();

            var trimmedInfo = new RegistrationInformation(
                info.FirstName.Trim(),
                info.LastName.Trim(),
                info.PhoneNumber?.Trim());

            if (!TryValidateModel(trimmedInfo)) return BadRequest();
            
            user.FirstName = trimmedInfo.FirstName;
            user.LastName = trimmedInfo.LastName;
            user.PhoneNumber = trimmedInfo.PhoneNumber;
            await _userManager.AddToRoleAsync(user, "User");
            await _userManager.UpdateAsync(user);

            return Ok();
        }
        [HttpPut]
        [Route("manage/info")]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> OnPutAsync([FromBody] RegistrationInformation info)
        {
            if (!TryValidateModel(info)) return BadRequest();

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound();

            user.FirstName = info.FirstName;
            user.LastName = info.LastName;
            user.PhoneNumber = info.PhoneNumber;
            await _userManager.UpdateAsync(user);

            return Ok();
        }
    }
}
