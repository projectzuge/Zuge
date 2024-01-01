using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;

namespace Zuge.Infrastructure.Persistence;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IUnitOfWork
{
    public Task CommitAsync(CancellationToken cancellationToken = default) =>
        SaveChangesAsync(cancellationToken);

    public IRepository<T> Repository<T>() where T : class =>
        new DbSetRepository<T>(Set<T>());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder
            .Entity<Journey>()
            .OwnsMany(journey => journey.Stops);

        _ = modelBuilder
            .Entity<Journey>()
            .OwnsOne(journey => journey.Train);
    }
}