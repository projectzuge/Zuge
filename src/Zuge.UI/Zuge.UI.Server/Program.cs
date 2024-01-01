using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;
using Zuge.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// var connectionString = builder.Configuration.GetConnectionString("DataConnection");
// _ = builder.Services.AddDbContext<IUnitOfWork, ZugeContext>(options => options.UseNpgsql(connectionString));

_ = builder.Services.AddDbContext<IUnitOfWork, ApplicationDbContext>(options => options.UseInMemoryDatabase("Zuge"));

_ = builder.Services.AddControllers();

_ = builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen();

var app = builder.Build();

_ = app
    .UseDefaultFiles()
    .UseStaticFiles();

_ = app
    .UseSwagger()
    .UseSwaggerUI();

_ = app
    .UseHttpsRedirection()
    .UseAuthorization();

_ = app.MapControllers();

_ = app.MapFallbackToFile("/index.html");

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
if (context.Database.IsNpgsql())
{
    _ = context.Database.EnsureDeleted();
    context.Database.Migrate();
}

var json = File.ReadAllText("journeys.json");
var journeys = JsonSerializer.Deserialize<IEnumerable<Journey>>(json) ?? throw new JsonException();
context.AddRange(journeys);
_ = context.SaveChanges();

app.Run();

public partial class Program;