namespace Zuge.Domain.Abstractions;

public interface IDomainUnitOfWork
{
    Task CommitAsync(CancellationToken cancellationToken = default);
    IDomainRepository<T> Repository<T>() where T : class;
}