namespace Zuge.Domain.Types;

public record Journey(DateOnly Date, Guid Id, decimal Price, IEnumerable<Stop> Stops, Train Train)
{
    Journey() : this(DateOnly.MinValue, Guid.Empty, decimal.Zero, new List<Stop>(), new(0, "")) { }
}