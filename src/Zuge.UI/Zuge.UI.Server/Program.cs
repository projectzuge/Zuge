using Zuge.Domain;
using Zuge.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// _ = builder.Services.AddDomain(builder.Configuration);
// _ = builder.Services.AddInfrastructure(builder.Configuration);

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

app.Run();