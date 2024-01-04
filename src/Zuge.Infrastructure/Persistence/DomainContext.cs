using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;

namespace Zuge.Infrastructure.Persistence;

public class DomainContext(DbContextOptions<DomainContext> options) : DbContext(options), IDomainUnitOfWork
{
    public Task CommitAsync(CancellationToken cancellationToken = default) =>
        SaveChangesAsync(cancellationToken);

    public IDomainRepository<T> Repository<T>() where T : class =>
        new DbSetDomainRepository<T>(Set<T>());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder.Entity<Journey>().OwnsMany(journey => journey.Stops);
        _ = modelBuilder.Entity<Journey>().OwnsOne(journey => journey.Train);
    }
}