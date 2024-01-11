using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;
using Zuge.Domain.Types.Authentication;
using Zuge.Infrastructure.Auth;
using Zuge.Infrastructure.Communication;
using Zuge.Infrastructure.Payment;
using Zuge.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

_ = builder.Services
    .AddDbContext<IDomainUnitOfWork, DomainContext>(options => options.UseInMemoryDatabase("Domain"))
    .AddDbContext<IAuthUnitOfWork, AuthenticationContext>(options => options.UseInMemoryDatabase("AuthDev"))
    .AddSingleton<IEmailSender, NoneSender>()
    .AddSingleton<IPaymentGateway, NoneGateway>();

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