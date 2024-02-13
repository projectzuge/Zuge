namespace Zuge.Domain;

public record Journey(
    TimeSpan Duration,
    int Id,
    decimal Price,
    string Train);

public record Stop(
    DateTimeOffset ArrivesAt,
    string ArrivesFrom,
    DateTimeOffset DepartsAt,
    string DepartsFrom,
    TimeSpan Duration,
    int Id,
    int JourneyId,
    int Ordinal);

public record Ticket(
    string EmailAddress,
    int Id,
    int JourneyId);

public interface IRepository<T>
{
    void AddRange(IEnumerable<T> entities);

    Task<List<T>> ToListAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default);
    
    Task<T?> FirstOrDefaultAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default);
}

public interface IUnitOfWork
{
    IRepository<Journey> Journeys { get; }
    IRepository<Stop> Stops { get; }
    IRepository<Ticket> Tickets { get; }

    Task CommitAsync(CancellationToken cancellationToken = default);
    Task SeedAsync(CancellationToken cancellationToken = default);
}

public record Result(
    object? Data,
    bool Success);

public record PurchaseTicketArgs(
    string CardCvc,
    DateOnly CardDate,
    string CardHolder,
    string CardNumber,
    string EmailAddress,
    int JourneyId);

public delegate Task<Result> PurchaseTicketHandler(
    IUnitOfWork unitOfWork,
    PurchaseTicketArgs args,
    CancellationToken cancellationToken = default);

public record SearchJourneysArgs(
    DateOnly Date,
    string From,
    string To);
    
public delegate Task<Result> SearchJourneysHandler(
    IUnitOfWork unitOfWork,
    SearchJourneysArgs args,
    CancellationToken cancellationToken = default);