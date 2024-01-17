using System.Linq.Expressions;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types.Authentication;

namespace Zuge.Domain.Specifications;

public class WhereEmailAccountSpecification(string email) : ISpecification<UserAccount>
{
    public IEnumerable<Expression<Func<UserAccount, bool>>> Predicate { get; } =
    [
        account => account.Email == email
    ];
}