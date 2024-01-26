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
    .AddDbContext<AuthenticationDbContext>(options => options.UseNpgsql("Database=postgres;Host=localhost;Password=12345;Username=postgres"))
    //.AddDbContext<AuthenticationDbContext>(options => options.UseInMemoryDatabase("IdentityAuth"))
    .AddAuthorization(options =>
    {
        options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
        options.AddPolicy("Employee", policy => policy.RequireRole("Employee"));
        options.AddPolicy("User", policy => policy.RequireRole("User"));
    })
    .AddIdentityApiEndpoints<ApplicationUser>()
    .AddRoles<IdentityRole>()
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
    }).RequireAuthorization();

_ = app.MapGet("/account/pingauth/employee", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    var role = user.FindFirstValue(ClaimTypes.Role);
    return Results.Json(new { Email = email, Role = role });
}).RequireAuthorization("Employee", "Admin");

_ = app.MapGet("/account/pingauth/admin", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    var role = user.FindFirstValue(ClaimTypes.Role);
    return Results.Json(new { Email = email, Role = role });
}).RequireAuthorization("Admin");

_ = app.MapFallbackToFile("/index.html");

await using var scope = app.Services.CreateAsyncScope();
var domain = scope.ServiceProvider.GetRequiredService<IDomainUnitOfWork>();
var json = await File.ReadAllTextAsync("journeys.json");
var journeys = JsonSerializer.Deserialize<IEnumerable<Journey>>(json) ?? [];
domain.Repository<Journey>().AddRange(journeys);
await domain.CommitAsync();

var auth = scope.ServiceProvider.GetRequiredService<IAuthUnitOfWork>();
var users_json = await File.ReadAllTextAsync("user_accounts.json");
var users = JsonSerializer.Deserialize<IEnumerable<UserAccount>>(users_json) ?? [];
auth.Repository<UserAccount>().AddRange(users);
await auth.CommitAsync();

app.Run();

public partial class Program;