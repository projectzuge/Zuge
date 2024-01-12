using System.Linq.Expressions;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types.Authentication;

namespace Zuge.Domain.Specifications;

public class WhereIdLoginDataSpecification(Guid id) : ISpecification<UserLoginData>
{
    public IEnumerable<Expression<Func<UserLoginData, bool>>> Predicate { get; } =
    [
        data => data.UserAccountId == id
    ];
}