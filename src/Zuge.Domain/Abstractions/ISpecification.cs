using System.Linq.Expressions;

namespace Zuge.Domain.Abstractions;

public interface ISpecification<T>
{
    IEnumerable<Expression<Func<T, bool>>> Predicate { get; }
}