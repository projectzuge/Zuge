using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Zuge.Domain;
using Zuge.Infrastructure;
using Zuge.UI.Server;

Environment.SetEnvironmentVariable("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES", "Microsoft.AspNetCore.SpaProxy");

var builder = WebApplication.CreateBuilder(args);

_ = builder.Services.AddDbContext<DomainContext>(optionsBuilder =>
    _ = Environment.GetEnvironmentVariable("POSTGRESQLCONNSTR_DOMAIN") is { } connectionString
        ? optionsBuilder.UseNpgsql(connectionString)
        : optionsBuilder.UseInMemoryDatabase("Domain"));

_ = builder.Services.AddDbContext<AuthenticationDbContext>(options =>
        _ = Environment.GetEnvironmentVariable("POSTGRESQLCONNSTR_IDENTITY") is { } connectionString
            ? options.UseNpgsql(connectionString)
            : options.UseInMemoryDatabase("Identity"))
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
_ = app.UseHttpsRedirection();
_ = app.UseAuthorization();
_ = app.MapControllers();

_ = app.MapPost("purchase", (DomainContext domainContext, Command.Purchase command, CancellationToken cancellationToken) =>
    domainContext.ExecuteCommandAsync(command, cancellationToken));

_ = app.MapPost("search", (DomainContext domainContext, Query.Search query, CancellationToken cancellationToken) =>
    domainContext.ExecuteQueryAsync(query, cancellationToken));

_ = app.MapGroup("account").MapIdentityApi<ApplicationUser>();
_ = app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();

var context = scope.ServiceProvider.GetRequiredService<DomainContext>();
// _ = context.Database.EnsureDeleted();
_ = context.Database.EnsureCreated();

var authenticationDbContext = scope.ServiceProvider.GetRequiredService<AuthenticationDbContext>();
// _ = authenticationDbContext.Database.EnsureDeleted();
if (authenticationDbContext.Database.EnsureCreated())
{
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
    {
        FirstName = "Test", LastName = "Employee", PhoneNumber = "1234567890"
    };
    var user = new ApplicationUser
        { FirstName = "Test", LastName = "User", PhoneNumber = "1234567890" };

    await roleManager.CreateAsync(new IdentityRole("Admin"));
    await roleManager.CreateAsync(new IdentityRole("Employee"));
    await roleManager.CreateAsync(new IdentityRole("User"));

    await userStore.SetUserNameAsync(admin, adminEmail, CancellationToken.None);
    await emailStore.SetEmailAsync(admin, adminEmail, CancellationToken.None);
    await userManager.CreateAsync(admin, password);
    await userManager.AddToRolesAsync(admin, ["Admin", "Employee", "User"]);

    await userStore.SetUserNameAsync(employee, empEmail,
        CancellationToken.None);
    await emailStore.SetEmailAsync(employee, empEmail, CancellationToken.None);
    await userManager.CreateAsync(employee, password);
    await userManager.AddToRolesAsync(employee, ["Employee", "User"]);

    await userStore.SetUserNameAsync(user, userEmail, CancellationToken.None);
    await emailStore.SetEmailAsync(user, userEmail, CancellationToken.None);
    await userManager.CreateAsync(user, password);
    await userManager.AddToRoleAsync(user, "User");
}

app.Run();

public partial class Program;