namespace Zuge.Domain;

public record Journey(
    TimeSpan Duration,
    int Id,
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