using Zuge.Domain.Abstractions;

namespace Zuge.Infrastructure.Payment;

public class NoneGateway : IPaymentGateway
{
    public Task CheckoutAsync(CancellationToken cancellationToken = default) =>
        Task.CompletedTask;
}