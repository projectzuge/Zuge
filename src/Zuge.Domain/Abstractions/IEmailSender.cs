namespace Zuge.Domain.Abstractions;

public interface IEmailSender
{
    Task SendAsync(string email, string subject, string htmlMessage);
}