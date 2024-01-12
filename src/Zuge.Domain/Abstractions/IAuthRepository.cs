using Zuge.Domain.Types.Authentication;

namespace Zuge.Domain.Abstractions;

public interface IAuthRepository<T>
{
    void AddRange(IEnumerable<T> entities);
    Task<bool> AnyAsync(ISpecification<T> specification, CancellationToken cancellationToken = default);
    Task<List<T>> ListAsync(ISpecification<T> specification, CancellationToken cancellationToken = default);
    Task<T?> FirstOrNull(ISpecification<T> specification, CancellationToken cancellationToken = default);


    //IAsyncEnumerable<T> QueryAsync(ISpecification<T> specification);
}