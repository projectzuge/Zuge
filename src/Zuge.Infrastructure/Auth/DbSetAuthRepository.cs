using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types.Authentication;

namespace Zuge.Infrastructure.Auth;

class DbSetAuthRepository<T>(DbSet<T> set) : IAuthRepository<T> where T : class
{
    public void AddRange(IEnumerable<T> entities) =>
        set.AddRange(entities);

    public Task<bool> AnyAsync(ISpecification<T> specification, CancellationToken cancellationToken = default) =>
        AsQueryable(specification).AnyAsync(cancellationToken);

    public Task<T?> FirstOrNull(ISpecification<T> specification, CancellationToken cancellationToken = default) =>
        AsQueryable(specification).FirstOrDefaultAsync(cancellationToken);

    public Task<List<T>> ListAsync(ISpecification<T> specification, CancellationToken cancellationToken = default) =>
        AsQueryable(specification).ToListAsync(cancellationToken);

    IQueryable<T> AsQueryable(ISpecification<T> specification) =>
        specification.Predicate.Aggregate(set.AsQueryable(), (query, predicate) => query.Where(predicate));

    //public IAsyncEnumerable<T> QueryAsync(ISpecification<T> specification) =>
    //    set.Where(specification.Predicate).AsAsyncEnumerable();
}