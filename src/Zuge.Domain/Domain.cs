namespace Zuge.Domain;

using FluentValidation;

public static class Domain
{
    static InlineValidator<PurchaseCommand> PurchaseCommandValidator => new()
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
    };

    static InlineValidator<SearchQuery> SearchQueryValidator => new()
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
    };

    public static async Task<Result> PurchaseAsync(
        this IUnitOfWork unitOfWork,
        PurchaseCommand purchaseCommand,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await PurchaseCommandValidator.ValidateAsync(
            purchaseCommand,
            cancellationToken);

        if (!validationResult.IsValid)
            return new(validationResult.ToDictionary(), false);

        var journey = await unitOfWork.Journeys.FirstOrDefaultAsync(
            purchaseCommand.JourneyId,
            cancellationToken);

        if (journey is null) return new(null, false);

        if (purchaseCommand.CardNumber != "4242424242424242")
            return new(null, false);

        Ticket ticket = new(purchaseCommand.EmailAddress, 0, journey.Id);
        unitOfWork.Tickets.AddRange([ticket]);
        await unitOfWork.CommitAsync(cancellationToken);

        return new(ticket, true);
    }

    public static async Task<Result> SearchAsync(
        this IUnitOfWork unitOfWork,
        SearchQuery searchQuery,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await SearchQueryValidator.ValidateAsync(
            searchQuery,
            cancellationToken);

        if (!validationResult.IsValid)
            return new(validationResult.ToDictionary(), false);

        var journeys = await unitOfWork.Journeys.ToListAsync(
            searchQuery,
            cancellationToken);

        return new(journeys, true);
    }
}