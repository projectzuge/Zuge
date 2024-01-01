using System.Linq.Expressions;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;

namespace Zuge.Domain.Specifications;

public class SearchJourneySpecification(DateOnly date, string from, string to) : ISpecification<Journey>
{
    public Expression<Func<Journey, bool>> Predicate { get; } = candidate =>
        candidate.Date == date &&
        candidate.Stops
            .Select(stop => stop.Station)
            .Where(station => station == from || station == to)
            .Take(1)
            .Contains(from) &&
        candidate.Stops
            .Select(stop => stop.Station)
            .Where(station => station == from || station == to)
            .Skip(1)
            .Take(1)
            .Contains(to);
}