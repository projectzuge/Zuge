namespace Zuge.Domain.Abstractions;

public interface IPaymentGateway
{
    Task CheckoutAsync(CancellationToken cancellationToken = default);
}