using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;
using Zuge.Domain.Types.Authentication;
using Zuge.Infrastructure.Auth;
using Zuge.Infrastructure.Auth.Entities;
using Zuge.Infrastructure.Communication;
using Zuge.Infrastructure.Payment;
using Zuge.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

_ = builder.Services
    .AddDbContext<IDomainUnitOfWork, DomainContext>(options => options.UseInMemoryDatabase("Domain"))
    .AddDbContext<IAuthUnitOfWork, AuthenticationContext>(options => options.UseInMemoryDatabase("AuthDev"))
    .AddSingleton<IEmailSender, NoneSender>()
    .AddSingleton<IPaymentGateway, NoneGateway>();

_ = builder.Services
    .AddDbContext<AuthenticationDbContext>(options => options.UseInMemoryDatabase("IdentityAuth"))
    .AddAuthorization(options =>
    {
        options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
        options.AddPolicy("Employee", policy => policy.RequireRole("Employee"));
        options.AddPolicy("User", policy => policy.RequireRole("User"));
    })
    .AddIdentityApiEndpoints<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddUserManager<ApplicationUserManager>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddEntityFrameworkStores<AuthenticationDbContext>();

_ = builder.Services.AddControllers();

_ = builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen();

var app = builder.Build();

_ = app
    .UseDefaultFiles()
    .UseStaticFiles();

if (app.Environment.IsDevelopment())
    _ = app
        .UseSwagger()
        .UseSwaggerUI();

_ = app
    .UseHttpsRedirection()
    .UseAuthorization();

_ = app.MapControllers();
    
#region map auth endpoints
_ = app.MapGroup("/account").MapIdentityApi<ApplicationUser>();

_ = app.MapPost("/account/logout", async (SignInManager<ApplicationUser> signInManager,
    [FromBody] object empty) =>
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }
        return Results.Unauthorized();
    }).RequireAuthorization();
_ = app.MapGet("/account/pingauth/", (ClaimsPrincipal user) =>
    {
        var email = user.FindFirstValue(ClaimTypes.Email);
        var role = user.FindFirstValue(ClaimTypes.Role);
        return Results.Json(new { Email = email, Role = role });
    }).RequireAuthorization("User");

_ = app.MapGet("/account/pingauth/employee", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    var role = user.FindFirstValue(ClaimTypes.Role);
    return Results.Json(new { Email = email, Role = role });
}).RequireAuthorization("Employee");

_ = app.MapGet("/account/pingauth/admin", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    var role = user.FindFirstValue(ClaimTypes.Role);
    return Results.Json(new { Email = email, Role = role });
}).RequireAuthorization("Admin");
#endregion

_ = app.MapFallbackToFile("/index.html");

await using var scope = app.Services.CreateAsyncScope();
var domain = scope.ServiceProvider.GetRequiredService<IDomainUnitOfWork>();
var json = await File.ReadAllTextAsync("journeys.json");
var journeys = JsonSerializer.Deserialize<IEnumerable<Journey>>(json) ?? [];
domain.Repository<Journey>().AddRange(journeys);
await domain.CommitAsync();

#region create test users for in-memory db
var userManager = scope.ServiceProvider.GetRequiredService<ApplicationUserManager>();
var userStore = scope.ServiceProvider.GetRequiredService<IUserStore<ApplicationUser>>();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
var emailStore = (IUserEmailStore<ApplicationUser>)userStore;

string adminEmail = "admin@zuge.fi";
string empEmail = "employee@zuge.fi";
string userEmail = "user@zuge.fi";
string password = "P@ssw0rd";

var admin = new ApplicationUser { FirstName = "Test", LastName = "Admin", PhoneNumber = "1234567890" };
var employee = new ApplicationUser { FirstName = "Test", LastName = "Employee", PhoneNumber = "1234567890" };
var user = new ApplicationUser { FirstName = "Test", LastName = "User", PhoneNumber = "1234567890" };

await roleManager.CreateAsync(new IdentityRole("Admin"));
await roleManager.CreateAsync(new IdentityRole("Employee"));
await roleManager.CreateAsync(new IdentityRole("User"));

await userStore.SetUserNameAsync(admin, adminEmail, CancellationToken.None);
await emailStore.SetEmailAsync(admin, adminEmail, CancellationToken.None);
await userManager.CreateAsync(admin, password);
await userManager.AddToRolesAsync(admin, ["Admin", "Employee", "User"]);

await userStore.SetUserNameAsync(employee, empEmail, CancellationToken.None);
await emailStore.SetEmailAsync(employee, empEmail, CancellationToken.None);
await userManager.CreateAsync(employee, password);
await userManager.AddToRolesAsync(employee, ["Employee", "User"]);

await userStore.SetUserNameAsync(user, userEmail, CancellationToken.None);
await emailStore.SetEmailAsync(user, userEmail, CancellationToken.None);
await userManager.CreateAsync(user, password);
await userManager.AddToRoleAsync(user, "User");
#endregion

app.Run();

public partial class Program;