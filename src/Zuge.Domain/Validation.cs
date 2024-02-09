namespace Zuge.Domain;

public static class Validation
{
    public static async Task<IDictionary<string, string[]>> ValidateAsync(
        this Purchase purchase,
        CancellationToken cancellationToken = default)
    {
        var result = await new InlineValidator<Purchase>
        { 
            rules => rules
                .RuleFor(model => model.CardCvc)
                .Matches(@"^\d{3,4}$"),

            rules => rules
                .RuleFor(model => model.CardDate)
                .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now)),

            rules => rules
                .RuleFor(model => model.CardHolder)
                .NotEmpty(),

            rules => rules
                .RuleFor(model => model.CardNumber)
                .CreditCard(),

            rules => rules
                .RuleFor(model => model.EmailAddress)
                .EmailAddress(),

            rules => rules
                .RuleFor(model => model.JourneyId)
                .GreaterThan(0)
        }.ValidateAsync(purchase, cancellationToken);

        return result.ToDictionary();
    }

    public static async Task<IDictionary<string, string[]>> ValidateAsync(
        this Search search,
        CancellationToken cancellationToken = default)
    {
        var result = await new InlineValidator<Search>
        {
            rules => rules
                .RuleFor(model => model.Date)
                .GreaterThanOrEqualTo(
                    DateOnly.FromDateTime(DateTimeOffset.UtcNow.Date)),

            rules => rules
                .RuleFor(model => model.From)
                .NotEmpty(),

            rules => rules
                .RuleFor(model => model.To)
                .NotEmpty(),

            rules => rules
                .RuleFor(model => model.From)
                .NotEqual(model => model.To)
        }.ValidateAsync(search, cancellationToken);

        return result.ToDictionary();
    }
}