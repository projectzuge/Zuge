using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Zuge.Domain;

namespace Zuge.Infrastructure;

public record DynamicResult(
    object? Data,
    bool Success);

public class DomainContext(DbContextOptions<DomainContext> options) : DbContext(options)
{
    public async Task<DynamicResult> ExecuteCommandAsync(Command command, CancellationToken cancellationToken = default)
    {
        try
        {
            return new(command switch
            {
                Command.Purchase purchase => await PurchaseAsync(purchase, cancellationToken),
                _ => throw new NotImplementedException()
            }, true);
        }
        catch (Exception exception)
        {
            return new(exception.Message, false);
        }
    }

    public async Task<DynamicResult> ExecuteQueryAsync(Query query, CancellationToken cancellationToken = default)
    {
        try
        {
            return new(query switch
            {
                Query.Search search => await SearchAsync(search, cancellationToken),
                _ => throw new NotImplementedException()
            }, true);
        }
        catch (Exception exception)
        {
            return new(exception.Message, false);
        }
    }

    async Task<object?> PurchaseAsync(Command.Purchase command, CancellationToken cancellationToken)
    {
        var (cardCvc, cardDate, cardHolder, cardNumber, emailAddress, journeyId) = command;

        new RegularExpressionAttribute(@"^\d{3,4}$").Validate(cardCvc, nameof(cardCvc));
        new RangeAttribute(typeof(DateOnly), $"{DateOnly.FromDateTime(DateTime.UtcNow)}", $"{DateOnly.MaxValue}").Validate(cardDate, nameof(cardDate));
        new RequiredAttribute().Validate(cardHolder, nameof(cardHolder));
        new CreditCardAttribute().Validate(cardNumber, nameof(cardNumber));
        new AllowedValuesAttribute(["4242424242424242"]).Validate(cardNumber, nameof(cardNumber));
        new EmailAddressAttribute().Validate(emailAddress, nameof(emailAddress));
        new RangeAttribute(1, int.MaxValue).Validate(journeyId, nameof(journeyId));

        Add(new Entity.Ticket(emailAddress, 0, journeyId));
        _ = await SaveChangesAsync(cancellationToken);

        return null;
    }

    async Task<object?> SearchAsync(Query.Search search, CancellationToken cancellationToken)
    {
        var (date, from, to) = search;

        var departures = await Set<Entity.Stop>()
            .Where(stop => DateOnly.FromDateTime(stop.DepartsAt.Date) == date && stop.DepartsFrom == from)
            .ToListAsync(cancellationToken);

        var arrivals = await Set<Entity.Stop>()
            .Where(stop => DateOnly.FromDateTime(stop.DepartsAt.Date) >= date && stop.DepartsFrom == to)
            .ToListAsync(cancellationToken);

        var journeyIds = departures
            .Zip(arrivals)
            .Where(pair => pair.First.JourneyId == pair.Second.JourneyId && pair.First.Ordinal < pair.Second.Ordinal)
            .Select(pair => pair.First.JourneyId);

        return await Set<Entity.Journey>()
            .Where(journey => journeyIds.Contains(journey.Id))
            .Select(journey => new
            {
                journey.Duration,
                journey.Id,
                journey.Price,
                Stops = Set<Entity.Stop>()
                    .Where(stop => stop.JourneyId == journey.Id)
                    .ToList(),
                journey.Train
            })
            .ToListAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder.Entity<Entity.Stop>()
            .HasOne<Entity.Journey>()
            .WithMany()
            .HasForeignKey(stop => stop.JourneyId);

        _ = modelBuilder.Entity<Entity.Ticket>()
            .HasOne<Entity.Journey>()
            .WithMany()
            .HasForeignKey(ticket => ticket.JourneyId);

        _ = modelBuilder.Entity<Entity.Journey>().HasData
        ([
            new(new(1, 43, 0), 1, 10M, "Juna 1"),
            new(new(1, 41, 0), 2, 10M, "Juna 1")
        ]);

        var utcNow = DateTimeOffset.UtcNow;
        var date = DateOnly.FromDateTime(utcNow.DateTime);
        var offset = utcNow.Offset;

        _ = modelBuilder.Entity<Entity.Stop>().HasData
        ([
            new(new(date, new(5, 57), offset), "Keuruu", new(date, new(5, 57), offset), "Keuruu", TimeSpan.Zero, 1, 1, 1),
            new(new(date, new(6, 11), offset), "Keuruu", new(date, new(6, 19), offset), "Haapamäki", new(0, 14, 0), 2, 1, 2),
            new(new(date, new(6, 28), offset), "Haapamäki", new(date, new(6, 29), offset), "Kolho", new(0, 9, 0), 3, 1, 3),
            new(new(date, new(6, 38), offset), "Kolho", new(date, new(6, 40), offset), "Vilppula", new(0, 9, 0), 4, 1, 4),
            new(new(date, new(6, 58), offset), "Vilppula", new(date, new(6, 59), offset), "Juupajoki", new(0, 18, 0), 5, 1, 5),
            new(new(date, new(7, 9), offset), "Juupajoki", new(date, new(7, 10), offset), "Orivesi Keskusta", new(0, 10, 0), 6, 1, 6),
            new(new(date, new(7, 14), offset), "Orivesi Keskusta", new(date, new(7, 15), offset), "Orivesi", new(0, 4, 0), 7, 1, 7),
            new(new(date, new(7, 40), offset), "Orivesi", new(date, new(7, 40), offset), "Tampere", new(0, 25, 0), 8, 1, 8),
            new(new(date, new(8, 6), offset), "Tampere", new(date, new(8, 6), offset), "Tampere", TimeSpan.Zero, 9, 2, 1),
            new(new(date, new(8, 31), offset), "Tampere", new(date, new(8, 32), offset), "Orivesi", new(0, 25, 0), 10, 2, 2),
            new(new(date, new(8, 35), offset), "Orivesi", new(date, new(8, 36), offset), "Orivesi Keskusta", new(0, 3, 0), 11, 2, 3),
            new(new(date, new(8, 46), offset), "Orivesi Keskusta", new(date, new(8, 47), offset), "Juupajoki", new(0, 10, 0), 12, 2, 4),
            new(new(date, new(9, 6), offset), "Juupajoki", new(date, new(9, 7), offset), "Vilppula", new(0, 19, 0), 13, 2, 5),
            new(new(date, new(9, 14), offset), "Vilppula", new(date, new(9, 15), offset), "Kolho", new(0, 7, 0), 14, 2, 6),
            new(new(date, new(9, 25), offset), "Kolho", new(date, new(9, 33), offset), "Haapamäki", new(0, 10, 0), 15, 2, 7),
            new(new(date, new(9, 47), offset), "Haapamäki", new(date, new(9, 47), offset), "Keuruu", new(0, 14, 0), 16, 2, 8)
        ]);
    }
}