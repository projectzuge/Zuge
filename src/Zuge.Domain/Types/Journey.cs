namespace Zuge.Domain.Types;

public record Journey(DateOnly Date, TimeSpan Duration, Guid Id, decimal Price, List<Stop> Stops, Train Train)
{
    Journey() : this(DateOnly.MinValue, TimeSpan.Zero, Guid.Empty, decimal.Zero, [], new(0, "")) { }
}