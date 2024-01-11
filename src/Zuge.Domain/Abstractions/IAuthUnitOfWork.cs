namespace Zuge.Domain.Abstractions;

public interface IAuthUnitOfWork
{
    Task CommitAsync(CancellationToken cancellationToken = default);
    IAuthRepository<T> Repository<T>() where T : class;
}