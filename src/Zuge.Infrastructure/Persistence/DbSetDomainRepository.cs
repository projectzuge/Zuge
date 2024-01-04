using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;

namespace Zuge.Infrastructure.Persistence;

class DbSetDomainRepository<T>(DbSet<T> set) : IDomainRepository<T> where T : class
{
    public void AddRange(IEnumerable<T> entities) =>
        set.AddRange(entities);

    public Task<bool> AnyAsync(ISpecification<T> specification, CancellationToken cancellationToken = default) =>
        AsQueryable(specification).AnyAsync(cancellationToken);

    public Task<List<T>> ListAsync(ISpecification<T> specification, CancellationToken cancellationToken = default) =>
        AsQueryable(specification).ToListAsync(cancellationToken);
    
    IQueryable<T> AsQueryable(ISpecification<T> specification) =>
        specification.Predicate.Aggregate(set.AsQueryable(), (query, predicate) => query.Where(predicate));
}