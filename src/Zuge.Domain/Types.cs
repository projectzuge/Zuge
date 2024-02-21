namespace Zuge.Domain;

public abstract record Entity
{
    public record Journey(
        TimeSpan Duration,
        int Id,
        decimal Price,
        string Train) : Entity;

    public record Stop(
        DateTimeOffset ArrivesAt,
        string ArrivesFrom,
        DateTimeOffset DepartsAt,
        string DepartsFrom,
        TimeSpan Duration,
        int Id,
        int JourneyId,
        int Ordinal) : Entity;

    public record Ticket(
        string EmailAddress,
        int Id,
        int JourneyId) : Entity;
}

public abstract record Command
{
    public record Purchase(
        string CardCvc,
        DateOnly CardDate,
        string CardHolder,
        string CardNumber,
        string EmailAddress,
        int JourneyId) : Command;
}

public abstract record Query
{
    public record Search(
        DateOnly Date,
        string From,
        string To) : Query;
}