namespace Zuge.Domain.Abstractions;

public interface IRepository<T>
{
    void AddRange(IEnumerable<T> entities);
    IAsyncEnumerable<T> QueryAsync(ISpecification<T> specification);
}