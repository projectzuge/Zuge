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

public record Ticket(
    string EmailAddress,
    int Id,
    int JourneyId);

public record Journey(
    TimeSpan Duration,
    int Id,
    decimal Price,
    IEnumerable<Stop> Stops,
    IEnumerable<Ticket> Tickets,
    string Train)
{
    Journey() : this(
        default!,
        default!,
        default!,
        default!,
        default!,
        default!) { }
}

public interface IJourneyRepository
{
    Task<Journey?> FirstOrDefaultAsync(
        int id,
        CancellationToken cancellationToken = default);
    
    Task<List<Journey>> ToListAsync(
        SearchQuery searchQuery,
        CancellationToken cancellationToken = default);
}

public interface IStopRepository
{
    Task<List<Stop>> ToListAsync(
        int journeyId,
        CancellationToken cancellationToken = default);
}

public interface ITicketRepository
{
    void AddRange(IEnumerable<Ticket> tickets);
}

public interface IUnitOfWork
{
    IJourneyRepository Journeys { get; }
    IStopRepository Stops { get; }
    ITicketRepository Tickets { get; }
    
    Task CommitAsync(CancellationToken cancellationToken = default);
}

public record Result(
    object? Data,
    bool Success);

public record PurchaseCommand(
    string CardCvc,
    DateOnly CardDate,
    string CardHolder,
    string CardNumber,
    string EmailAddress,
    int JourneyId);

public record SearchQuery(
    DateOnly Date,
    string From,
    string To);