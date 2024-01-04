using System.Linq.Expressions;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;

namespace Zuge.Domain.Specifications;

public class WhereIdJourneySpecification(Guid id) : ISpecification<Journey>
{
    public IEnumerable<Expression<Func<Journey, bool>>> Predicate { get; } =
    [
        journey => journey.Id == id
    ];
}