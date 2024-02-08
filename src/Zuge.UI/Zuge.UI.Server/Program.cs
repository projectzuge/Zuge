using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Zuge.Domain;
using Zuge.Infrastructure;

Environment.SetEnvironmentVariable(
    "ASPNETCORE_ENVIRONMENT",
    "Development");

Environment.SetEnvironmentVariable(
    "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES",
    "Microsoft.AspNetCore.SpaProxy");

var builder = WebApplication.CreateBuilder(args);
_ = builder.Services.AddInfrastructure();

_ = builder.Services
    .AddDbContext<AuthenticationDbContext>(options =>
        options.UseInMemoryDatabase("IdentityAuth"))
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

_ = builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "ZugeAuth";
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.SlidingExpiration = true;
});

_ = builder.Services.AddControllers();
_ = builder.Services.AddEndpointsApiExplorer();
_ = builder.Services.AddSwaggerGen();

var app = builder.Build();
_ = app.UseDefaultFiles();
_ = app.UseStaticFiles();
_ = app.UseSwagger();
_ = app.UseSwaggerUI();
_ = app.UseAuthentication();
//_ = app.UseHttpsRedirection();
_ = app.UseAuthorization();
_ = app.MapControllers();
_ = app.MapPost("purchase", Domain.PurchaseAsync);
_ = app.MapPost("search", Domain.SearchAsync);

#region map auth endpoints

_ = app.MapGroup("/account").MapIdentityApi<ApplicationUser>();

_ = app.MapPost("/account/logout", async (
    SignInManager<ApplicationUser> signInManager,
    [FromBody] object? empty) =>
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
        return Results.Ok();
    }).RequireAuthorization("User");

_ = app.MapGet("/account/pingauth/employee", (ClaimsPrincipal user) =>
{
    return Results.Ok();
}).RequireAuthorization("Employee");

_ = app.MapGet("/account/pingauth/admin", (ClaimsPrincipal user) =>
{
    return Results.Ok();
}).RequireAuthorization("Admin");

#endregion

_ = app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();
var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
await unitOfWork.SeedAsync();

#region create test users for in-memory db

var userManager =
    scope.ServiceProvider.GetRequiredService<ApplicationUserManager>();
var userStore = scope.ServiceProvider
    .GetRequiredService<IUserStore<ApplicationUser>>();
var roleManager =
    scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
var emailStore = (IUserEmailStore<ApplicationUser>)userStore;

string adminEmail = "admin@zuge.fi";
string empEmail = "employee@zuge.fi";
string userEmail = "user@zuge.fi";
string password = "P@ssw0rd";

var admin = new ApplicationUser
    { FirstName = "Test", LastName = "Admin", PhoneNumber = "1234567890" };
var employee = new ApplicationUser
    { FirstName = "Test", LastName = "Employee", PhoneNumber = "1234567890" };
var user = new ApplicationUser
    { FirstName = "Test", LastName = "User", PhoneNumber = "1234567890" };

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