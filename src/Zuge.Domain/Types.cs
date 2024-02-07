using System.Linq.Expressions;

namespace Zuge.Domain;

public record Stop(
    DateTimeOffset ArrivesAt,
    string ArrivesFrom,
    DateTimeOffset DepartsAt,
    string DepartsFrom,
    TimeSpan Duration,
    int Id,
    int JourneyId,
    int Ordinal);

public record Journey(
    TimeSpan Duration,
    int Id,
    decimal Price,
    List<Stop> Stops,
    List<Ticket> Tickets,
    string Train)
{
    Journey() : this(default!, default!, default!, default!, default!, default!) { }
}

public record Ticket(
    string EmailAddress,
    int Id,
    int JourneyId);

public interface IRepository<T>
{
    void AddRange(IEnumerable<T> entities);
    Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
    Task<List<T>> ToListAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
}

public interface IUnitOfWork
{
    IRepository<Journey> Journeys { get; }
    IRepository<Stop> Stops { get; }
    IRepository<Ticket> Tickets { get; }
    Task CommitAsync(CancellationToken cancellationToken = default);
}

public record Result(object? Data, bool Success);

public record PurchaseCommand(string CardCvc, DateOnly CardDate, string CardHolder, string CardNumber, string EmailAddress, int JourneyId);

public record SearchQuery(DateOnly Date, string From, string To);