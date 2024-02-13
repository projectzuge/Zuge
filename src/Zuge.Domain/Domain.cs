namespace Zuge.Domain;

public static class Domain
{
    public static PurchaseTicketHandler PurchaseTicketAsync =>
        async (unitOfWork, args, cancellationToken) =>
        {
            var result = await new InlineValidator<PurchaseTicketArgs>
            {
                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.CardCvc)
                    .Matches(@"^\d{3,4}$"),

                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.CardDate)
                    .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now)),

                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.CardHolder)
                    .NotEmpty(),

                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.CardNumber)
                    .CreditCard(),

                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.EmailAddress)
                    .EmailAddress(),

                rules => rules
                    .RuleFor(purchaseTicket => purchaseTicket.JourneyId)
                    .GreaterThan(0)
            }.ValidateAsync(args, cancellationToken);

            if (result.ToDictionary() is { Count: > 0 } errors)
                return new(errors, false);

            var (_, _, _, cardNumber, emailAddress, journeyId) = args;

            var journey = await unitOfWork.Journeys.FirstOrDefaultAsync(
                journey => journey.Id == journeyId,
                cancellationToken);

            if (journey is null)
                return new(null, false);

            if (cardNumber != "4242424242424242")
                return new(null, false);

            Ticket ticket = new(emailAddress, 0, journeyId);
            unitOfWork.Tickets.AddRange([ticket]);
            await unitOfWork.CommitAsync(cancellationToken);

            return new(null, true);
        };

    public static SearchJourneysHandler SearchJourneysAsync =>
        async (unitOfWork, args, cancellationToken) =>
        {
            var result = await new InlineValidator<SearchJourneysArgs>
            {
                rules => rules
                    .RuleFor(searchJourneys => searchJourneys.Date)
                    .GreaterThanOrEqualTo(
                        DateOnly.FromDateTime(DateTimeOffset.UtcNow.Date)),

                rules => rules
                    .RuleFor(searchJourneys => searchJourneys.From)
                    .NotEmpty(),

                rules => rules
                    .RuleFor(searchJourneys => searchJourneys.To)
                    .NotEmpty(),

                rules => rules
                    .RuleFor(searchJourneys => searchJourneys.From)
                    .NotEqual(searchJourneys => searchJourneys.To)
            }.ValidateAsync(args, cancellationToken);

            if (result.ToDictionary() is { Count: > 0 } errors)
                return new(errors, false);

            var (date, from, to) = args;

            var froms = await unitOfWork.Stops.ToListAsync(stop =>
                    DateOnly.FromDateTime(stop.DepartsAt.Date) <= date &&
                    stop.DepartsFrom == from,
                cancellationToken);

            var tos = await unitOfWork.Stops.ToListAsync(stop =>
                    DateOnly.FromDateTime(stop.DepartsAt.Date) >= date &&
                    stop.DepartsFrom == to,
                cancellationToken);

            var ids = froms
                .Zip(tos)
                .Where(pair =>
                    pair.First.JourneyId == pair.Second.JourneyId &&
                    pair.First.Ordinal < pair.Second.Ordinal)
                .Select(pair => pair.First.JourneyId);

            var journeys = await unitOfWork.Journeys.ToListAsync(
                journey => ids.Contains(journey.Id),
                cancellationToken);

            var data = await Task.WhenAll(
                journeys.Select(async journey => new
                {
                    journey.Duration,
                    journey.Id,
                    journey.Price,
                    Stops = await unitOfWork.Stops.ToListAsync(
                        stop => stop.JourneyId == journey.Id,
                        cancellationToken),
                    journey.Train
                }));

            return new(data, true);
        };
}