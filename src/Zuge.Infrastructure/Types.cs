﻿namespace Zuge.Infrastructure;

public class Repository<T>(DbSet<T> source) : IRepository<T> where T : class
{
    public void AddRange(IEnumerable<T> entities) =>
        source.AddRange(entities);
    
    public Task<T?> FirstOrDefaultAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default) =>
        source.Where(predicate).FirstOrDefaultAsync(cancellationToken);

    public Task<List<T>> ToListAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default) =>
        source.Where(predicate).ToListAsync(cancellationToken);
}

public class UnitOfWork(DbContextOptions<UnitOfWork> options) :
    DbContext(options),
    IUnitOfWork
{
    public IRepository<Journey> Journeys =>
        new Repository<Journey>(Set<Journey>());

    public IRepository<Stop> Stops =>
        new Repository<Stop>(Set<Stop>());

    public IRepository<Ticket> Tickets =>
        new Repository<Ticket>(Set<Ticket>());

    public Task CommitAsync(CancellationToken cancellationToken = default) =>
        SaveChangesAsync(cancellationToken);

    public Task MigrateAsync(CancellationToken cancellationToken = default) =>
        Database.IsRelational()
            ? Database.MigrateAsync(cancellationToken)
            : Database.EnsureCreatedAsync(cancellationToken);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var date = DateOnly.FromDateTime(DateTimeOffset.UtcNow.Date);
        var offset = TimeSpan.Zero;

        _ = modelBuilder.Entity<Journey>().HasData
        ([
            new
            {
                Duration = new TimeSpan(1, 43, 0),
                Id = 1,
                Price = 10M,
                Train = "Juna 1"
            },
            new
            {
                Duration = new TimeSpan(1, 41, 0),
                Id = 2,
                Price = 10M,
                Train = "Juna 1"
            }
        ]);

        _ = modelBuilder.Entity<Stop>().HasData
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

        _ = modelBuilder.Entity<Ticket>();
    }
}