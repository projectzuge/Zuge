using FluentValidation;

namespace Zuge.Domain;

public static class Domain
{
    public static async Task<Result> PurchaseAsync(this IUnitOfWork unitOfWork, PurchaseCommand purchaseCommand, CancellationToken cancellationToken = default)
    {
        InlineValidator<PurchaseCommand> validator = new()
        {
            v => v.RuleFor(p => p.CardCvc).Matches(@"^\d{3,4}$"),
            v => v.RuleFor(p => p.CardDate).GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now)),
            v => v.RuleFor(p => p.CardHolder).NotEmpty(),
            v => v.RuleFor(p => p.CardNumber).CreditCard(),
            v => v.RuleFor(p => p.EmailAddress).EmailAddress(),
            v => v.RuleFor(p => p.JourneyId).GreaterThan(0)
        };

        if (await validator.ValidateAsync(purchaseCommand, cancellationToken) is { IsValid: false } result)
            return new(result.ToDictionary(), false);

        var journey = await unitOfWork.Journeys.FirstOrDefaultAsync(journey => journey.Id == purchaseCommand.JourneyId, cancellationToken);
        if (journey is null) return new(null, false);

        if (purchaseCommand.CardNumber != "4242424242424242") return new(null, false);
        
        Ticket ticket = new(purchaseCommand.EmailAddress, 0, journey.Id);
        unitOfWork.Tickets.AddRange([ticket]);
        await unitOfWork.CommitAsync(cancellationToken);

        return new(ticket, true);
    }
    
    public static async Task<Result> SearchAsync(this IUnitOfWork unitOfWork, SearchQuery searchQuery, CancellationToken cancellationToken = default)
    {
        InlineValidator<SearchQuery> validator = new()
        {
            v => v.RuleFor(p => p.Date).GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now)),
            v => v.RuleFor(p => p.From).NotEmpty(),
            v => v.RuleFor(p => p.To).NotEmpty(),
            v => v.RuleFor(p => p.From).NotEqual(p => p.To)
        };

        if (await validator.ValidateAsync(searchQuery, cancellationToken) is { IsValid: false } result)
            return new(result.ToDictionary(), false);

        var journeys = await unitOfWork.Journeys.ToListAsync(journey =>
            journey.Stops.Any(stop => DateOnly.FromDateTime(stop.DepartsAt.Date) == searchQuery.Date && stop.DepartsFrom == searchQuery.From) &&
            journey.Stops.Any(stop => stop.DepartsFrom == searchQuery.To) &&
            journey.Stops.First(stop => DateOnly.FromDateTime(stop.DepartsAt.Date) == searchQuery.Date && stop.DepartsFrom == searchQuery.From).Ordinal < journey.Stops.First(stop => stop.DepartsFrom == searchQuery.To).Ordinal, cancellationToken);

        return new(journeys, true);
    }
}