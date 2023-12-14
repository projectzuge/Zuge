using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Zuge.Infrastructure.Authentication;
using Zuge.Infrastructure.Data;

namespace Zuge.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) => services
        .AddDbContext<AuthenticationContext>(options => options.UseNpgsql(configuration.GetConnectionString("AuthenticationConnection")))
        .AddDbContext<DataContext>(options => options.UseNpgsql(configuration.GetConnectionString("DataConnection")));
}