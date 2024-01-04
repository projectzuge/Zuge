using Zuge.Domain.Abstractions;

namespace Zuge.Infrastructure.Communication;

public class NoneSender : IEmailSender
{
    public Task SendAsync(string email, string subject, string htmlMessage) =>
        Task.CompletedTask;
}