namespace Zuge.Domain;

public record Result(
    object? Data,
    bool Success);

public record Purchase(
    string CardCvc,
    DateOnly CardDate,
    string CardHolder,
    string CardNumber,
    string EmailAddress,
    int JourneyId);

public delegate Task<Result> PurchaseAsync(
    Purchase purchase,
    CancellationToken cancellationToken = default);

public record Search(
    DateOnly Date,
    string From,
    string To);

public delegate Task<Result> SearchAsync(
    Search search,
    CancellationToken cancellationToken = default);