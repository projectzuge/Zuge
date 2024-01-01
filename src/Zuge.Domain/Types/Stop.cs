namespace Zuge.Domain.Types;

public record Stop(TimeOnly Arrival, TimeOnly Departure, string Station);