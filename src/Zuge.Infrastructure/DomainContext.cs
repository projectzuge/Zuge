namespace Zuge.Infrastructure;

public class DomainContext(DbContextOptions<DomainContext> options)
    : DbContext(options)
{
    public async Task<Result> PurchaseAsync(
        Purchase purchase,
        CancellationToken cancellationToken = default)
    {
        var errors = await purchase.ValidateAsync(cancellationToken);
        if (errors.Count > 0) return new(errors, false);

        var (_, _, _, cardNumber, emailAddress, journeyId) = purchase;

        var journey = await Set<Journey>().FirstOrDefaultAsync(
            journey => journey.Id == journeyId,
            cancellationToken);

        if (journey is null) return new(null, false);
        if (cardNumber != "4242424242424242") return new(null, false);

        Ticket ticket = new(emailAddress, 0, journeyId);
        _ = Add(ticket);
        _ = await SaveChangesAsync(cancellationToken);

        var data = new
        {
            ticket.EmailAddress,
            ticket.Id,
            Journey = new
            {
                journey.Duration,
                journey.Id,
                Stops = await Set<Stop>()
                    .Where(stop => stop.JourneyId == journey.Id)
                    .OrderBy(stop => stop.Ordinal)
                    .ToListAsync(cancellationToken),
                journey.Train
            }
        };

        return new(data, true);
    }

    public async Task<Result> SearchAsync(
        Search search,
        CancellationToken cancellationToken = default)
    {
        var errors = await search.ValidateAsync(cancellationToken);
        if (errors.Count > 0) return new(errors, false);

        var (date, from, to) = search;

        var journeys = await Set<Journey>()
            .Where(journey =>
                Set<Stop>().Any(stop =>
                    stop.JourneyId == journey.Id &&
                    DateOnly.FromDateTime(stop.DepartsAt.Date) ==
                    date &&
                    stop.DepartsFrom == from) &&
                Set<Stop>().Any(stop =>
                    stop.JourneyId == journey.Id &&
                    stop.DepartsFrom == to) &&
                Set<Stop>().First(stop =>
                    stop.JourneyId == journey.Id &&
                    DateOnly.FromDateTime(stop.DepartsAt.Date) ==
                    date &&
                    stop.DepartsFrom == from).Ordinal <
                Set<Stop>().First(stop =>
                    stop.JourneyId == journey.Id &&
                    stop.DepartsFrom == to).Ordinal)
            .ToListAsync(cancellationToken);

        List<object> data = [];

        foreach (var journey in journeys)
            data.Add(new
            {
                journey.Duration,
                journey.Id,
                Price = 10M,
                Stops = await Set<Stop>()
                    .Where(stop => stop.JourneyId == journey.Id)
                    .OrderBy(stop => stop.Ordinal)
                    .ToListAsync(cancellationToken),
                journey.Train
            });

        return new(data, true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var date = DateOnly.FromDateTime(DateTimeOffset.UtcNow.Date);
        var offset = TimeSpan.Zero;

        _ = modelBuilder
            .Entity<Journey>()
            .HasData
            ([
                new
                {
                    Duration = new TimeSpan(1, 43, 0),
                    Id = 1,
                    Train = "Juna 1"
                },
                new
                {
                    Duration = new TimeSpan(1, 41, 0),
                    Id = 2,
                    Train = "Juna 1"
                }
            ]);

        _ = modelBuilder
            .Entity<Stop>()
            .HasData
            ([
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(5, 57), offset),
                    ArrivesFrom = "Keuruu",
                    DepartsAt = new DateTimeOffset(date, new(5, 57), offset),
                    DepartsFrom = "Keuruu",
                    Duration = TimeSpan.Zero,
                    Id = 1,
                    JourneyId = 1,
                    Ordinal = 1
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(6, 11), offset),
                    ArrivesFrom = "Keuruu",
                    DepartsAt = new DateTimeOffset(date, new(6, 19), offset),
                    DepartsFrom = "Haapamäki",
                    Duration = new TimeSpan(0, 14, 0),
                    Id = 2,
                    JourneyId = 1,
                    Ordinal = 2
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(6, 28), offset),
                    ArrivesFrom = "Haapamäki",
                    DepartsAt = new DateTimeOffset(date, new(6, 29), offset),
                    DepartsFrom = "Kolho",
                    Duration = new TimeSpan(0, 9, 0),
                    Id = 3,
                    JourneyId = 1,
                    Ordinal = 3
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(6, 38), offset),
                    ArrivesFrom = "Kolho",
                    DepartsAt = new DateTimeOffset(date, new(6, 40), offset),
                    DepartsFrom = "Vilppula",
                    Duration = new TimeSpan(0, 9, 0),
                    Id = 4,
                    JourneyId = 1,
                    Ordinal = 4
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(6, 58), offset),
                    ArrivesFrom = "Vilppula",
                    DepartsAt = new DateTimeOffset(date, new(6, 59), offset),
                    DepartsFrom = "Juupajoki",
                    Duration = new TimeSpan(0, 18, 0),
                    Id = 5,
                    JourneyId = 1,
                    Ordinal = 5,
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(7, 9), offset),
                    ArrivesFrom = "Juupajoki",
                    DepartsAt = new DateTimeOffset(date, new(7, 10), offset),
                    DepartsFrom = "Orivesi Keskusta",
                    Duration = new TimeSpan(0, 10, 0),
                    Id = 6,
                    JourneyId = 1,
                    Ordinal = 6
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(7, 14), offset),
                    ArrivesFrom = "Orivesi Keskusta",
                    DepartsAt = new DateTimeOffset(date, new(7, 15), offset),
                    DepartsFrom = "Orivesi",
                    Duration = new TimeSpan(0, 4, 0),
                    Id = 7,
                    JourneyId = 1,
                    Ordinal = 7
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(7, 40), offset),
                    ArrivesFrom = "Orivesi",
                    DepartsAt = new DateTimeOffset(date, new(7, 40), offset),
                    DepartsFrom = "Tampere",
                    Duration = new TimeSpan(0, 25, 0),
                    Id = 8,
                    JourneyId = 1,
                    Ordinal = 8
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(8, 6), offset),
                    ArrivesFrom = "Tampere",
                    DepartsAt = new DateTimeOffset(date, new(8, 6), offset),
                    DepartsFrom = "Tampere",
                    Duration = TimeSpan.Zero,
                    Id = 9,
                    JourneyId = 2,
                    Ordinal = 1
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(8, 31), offset),
                    ArrivesFrom = "Tampere",
                    DepartsAt = new DateTimeOffset(date, new(8, 32), offset),
                    DepartsFrom = "Orivesi",
                    Duration = new TimeSpan(0, 25, 0),
                    Id = 10,
                    JourneyId = 2,
                    Ordinal = 2
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(8, 35), offset),
                    ArrivesFrom = "Orivesi",
                    DepartsAt = new DateTimeOffset(date, new(8, 36), offset),
                    DepartsFrom = "Orivesi Keskusta",
                    Duration = new TimeSpan(0, 3, 0),
                    Id = 11,
                    JourneyId = 2,
                    Ordinal = 3
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(8, 46), offset),
                    ArrivesFrom = "Orivesi Keskusta",
                    DepartsAt = new DateTimeOffset(date, new(8, 47), offset),
                    DepartsFrom = "Juupajoki",
                    Duration = new TimeSpan(0, 10, 0),
                    Id = 12,
                    JourneyId = 2,
                    Ordinal = 4,
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(9, 6), offset),
                    ArrivesFrom = "Juupajoki",
                    DepartsAt = new DateTimeOffset(date, new(9, 7), offset),
                    DepartsFrom = "Vilppula",
                    Duration = new TimeSpan(0, 19, 0),
                    Id = 13,
                    JourneyId = 2,
                    Ordinal = 5
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(9, 14), offset),
                    ArrivesFrom = "Vilppula",
                    DepartsAt = new DateTimeOffset(date, new(9, 15), offset),
                    DepartsFrom = "Kolho",
                    Duration = new TimeSpan(0, 7, 0),
                    Id = 14,
                    JourneyId = 2,
                    Ordinal = 6,
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(9, 25), offset),
                    ArrivesFrom = "Kolho",
                    DepartsAt = new DateTimeOffset(date, new(9, 33), offset),
                    DepartsFrom = "Haapamäki",
                    Duration = new TimeSpan(0, 10, 0),
                    Id = 15,
                    JourneyId = 2,
                    Ordinal = 7
                },
                new
                {
                    ArrivesAt = new DateTimeOffset(date, new(9, 47), offset),
                    ArrivesFrom = "Kolho",
                    DepartsAt = new DateTimeOffset(date, new(9, 47), offset),
                    DepartsFrom = "Keuruu",
                    Duration = new TimeSpan(0, 14, 0),
                    Id = 16,
                    JourneyId = 2,
                    Ordinal = 8
                }
            ]);

        _ = modelBuilder
            .Entity<Ticket>()
            .HasData([]);
    }
}