namespace Zuge.Infrastructure;

using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class Infrastructure
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services) =>
        services.AddDbContext<IUnitOfWork, UnitOfWork>(options =>
            _ = options.UseInMemoryDatabase("Data"));

    public static Task SeedAsync(
        this IUnitOfWork unitOfWork,
        CancellationToken cancellationToken = default) =>
        unitOfWork switch
        {
            UnitOfWork { Database: var database } when database.IsInMemory() =>
                database.EnsureCreatedAsync(cancellationToken),
            _ => Task.CompletedTask
        };
}