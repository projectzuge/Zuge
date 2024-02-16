using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Zuge.UI.Server.Controllers;

public record RegistrationInformation(
    [Length(1, 100)] string FirstName, 
    [Length(1, 100)] string LastName, 
    [Phone] string? PhoneNumber);

[ApiController]
[Route("account")]
public class AccountController(AuthenticationDbContext authenticationDbContext, ApplicationUserManager userManager) : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = "User")]
    public async Task<IActionResult> OnGetAsync()
    {
        var appUser = await userManager.GetUserAsync(User);
        if (appUser is null) return NotFound("This should not happen");
        var roles = await userManager.GetRolesAsync(appUser);
        var userId = await userManager.GetUserIdAsync(appUser);

        return Ok(new { appUser.Email, appUser.FirstName, appUser.LastName, appUser.PhoneNumber, roles, userId });
    }
    [HttpGet]
    [Authorize(Policy = "Admin")]
    [Route("pingauth/admin")]
    public IActionResult OnGetPingAuthAdmin()
    {
        return Ok();
    }
    [HttpGet]
    [Authorize(Policy = "Employee")]
    [Route("pingauth/employee")]
    public IActionResult OnGetPingAuthEmployee()
    {
        return Ok();
    }
    [HttpGet]
    [Authorize(Policy = "User")]
    [Route("pingauth")]
    public IActionResult OnGetPingAuthUser()
    {
        return Ok();
    }
    [HttpPost]
    [Route("manage/register")]
    public async Task<IActionResult> OnPostAsync([FromBody] RegistrationInformation info, [FromQuery] string email)
    {
        var user = await authenticationDbContext.Users.FirstOrDefaultAsync(user => user.Email == email);
        if (user == null) return NotFound();

        var trimmedInfo = new RegistrationInformation(
            info.FirstName.Trim(),
            info.LastName.Trim(),
            info.PhoneNumber?.Trim());

        if (!TryValidateModel(trimmedInfo)) return BadRequest();
            
        user.FirstName = trimmedInfo.FirstName;
        user.LastName = trimmedInfo.LastName;
        user.PhoneNumber = trimmedInfo.PhoneNumber;
        await userManager.AddToRoleAsync(user, "User");
        await userManager.UpdateAsync(user);

        return Ok();
    }
    [HttpPut]
    [Route("manage/info")]
    [Authorize(Policy = "User")]
    public async Task<IActionResult> OnPutAsync([FromBody] RegistrationInformation info)
    {
        if (!TryValidateModel(info)) return BadRequest();

        var user = await userManager.GetUserAsync(User);
        if (user == null) return NotFound();

        user.FirstName = info.FirstName;
        user.LastName = info.LastName;
        user.PhoneNumber = info.PhoneNumber;
        await userManager.UpdateAsync(user);
        var roles = await userManager.GetRolesAsync(user);
        var userId = await userManager.GetUserIdAsync(user);

        return Ok(new { user.Email, user.FirstName, user.LastName, user.PhoneNumber, roles, userId });
    }
    [HttpPost]
    [Authorize(Policy = "User")]
    [Route("logout")]
    public async Task<IActionResult> OnPostLogoutAsync([FromServices] SignInManager<ApplicationUser> signInManager, [FromBody] object? empty)
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        return Unauthorized();
    }
}