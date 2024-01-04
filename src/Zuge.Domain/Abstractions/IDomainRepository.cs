namespace Zuge.Domain.Abstractions;

public interface IDomainRepository<T>
{
    void AddRange(IEnumerable<T> entities);
    Task<bool> AnyAsync(ISpecification<T> specification, CancellationToken cancellationToken = default);
    Task<List<T>> ListAsync(ISpecification<T> specification, CancellationToken cancellationToken = default);
}