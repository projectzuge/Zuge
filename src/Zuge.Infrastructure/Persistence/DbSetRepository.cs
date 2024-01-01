using Microsoft.EntityFrameworkCore;
using Zuge.Domain.Abstractions;

namespace Zuge.Infrastructure.Persistence;

class DbSetRepository<T>(DbSet<T> set) : IRepository<T> where T : class
{
    public void AddRange(IEnumerable<T> entities) =>
        set.AddRange(entities);

    public IAsyncEnumerable<T> QueryAsync(ISpecification<T> specification) =>
        set.Where(specification.Predicate).AsAsyncEnumerable();
}