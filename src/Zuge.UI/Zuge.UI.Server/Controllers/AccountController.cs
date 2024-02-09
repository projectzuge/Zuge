using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data;
using Zuge.Infrastructure;

namespace Zuge.UI.Server.Controllers;

public record RegistrationInformation(
    [Length(1, 100)] string FirstName, 
    [Length(1, 100)] string LastName, 
    [Length(10, 20)] string? PhoneNumber);

[ApiController]
[Route("account")]
public class AccountController(AuthenticationDbContext authenticationDbContext, ApplicationUserManager userManager) : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = "User")]
    public async Task<IActionResult> OnGetAsync()
    {
        var appUser = await userManager.GetUserAsync(User);
        if (appUser == null) return NotFound("This should not happen");
        var roles = await userManager.GetRolesAsync(appUser);
        var userId = await userManager.GetUserIdAsync(appUser);

        return Ok(new { appUser.Email, appUser.FirstName, appUser.LastName, appUser.PhoneNumber, roles, userId });
    }

    [HttpPost]
    [Route("manage/register")]
    public async Task<IActionResult> OnPostAsync([FromBody] RegistrationInformation info, [FromQuery] string email)
    {
        var user = authenticationDbContext.Users.FirstOrDefault(user => user.Email == email);
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
}