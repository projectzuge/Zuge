namespace Zuge.Domain;

public record StopDto(
    DateTimeOffset ArrivesAt,
    string ArrivesFrom,
    DateTimeOffset DepartsAt,
    string DepartsFrom,
    TimeSpan Duration,
    int Ordinal);

public record JourneyDto(
    TimeSpan Duration,
    int Id,
    IEnumerable<StopDto> Stops,
    string Train);

public record TicketDto(
    string EmailAddress,
    int Id,
    JourneyDto Journey);