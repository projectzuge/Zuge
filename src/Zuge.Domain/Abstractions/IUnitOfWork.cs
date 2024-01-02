namespace Zuge.Domain.Abstractions;

public interface IUnitOfWork
{
    Task CommitAsync(CancellationToken cancellationToken = default);
    IRepository<T> Repository<T>() where T : class;
}