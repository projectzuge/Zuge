using Microsoft.AspNetCore.Mvc;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Specifications;
using Zuge.Domain.Types;

namespace Zuge.UI.Server.Controllers;

public record Checkout(Guid JourneyId);

[ApiController]
[Route("[controller]")]
public sealed class PaymentController(IEmailSender emailSender, IPaymentGateway paymentGateway, IDomainUnitOfWork unitOfWork) : ControllerBase
{
    [HttpPost]
    public async Task OnPostAsync(Checkout checkout, CancellationToken cancellationToken = default)
    {
        if (!await unitOfWork.Repository<Journey>().AnyAsync(new WhereIdJourneySpecification(checkout.JourneyId), cancellationToken)) return;
        await paymentGateway.CheckoutAsync(cancellationToken);
        Ticket ticket = new(Guid.NewGuid(), checkout.JourneyId);
        await emailSender.SendAsync("", "", ticket.Id.ToString());
    }
}