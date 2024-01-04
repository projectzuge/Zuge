using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;
using Zuge.Infrastructure.Communication;
using Zuge.Infrastructure.Payment;
using Zuge.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

_ = builder.Services
    .AddDbContext<IDomainUnitOfWork, DomainContext>(options => options.UseInMemoryDatabase("Domain"))
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

app.Run();

public partial class Program;