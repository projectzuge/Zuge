using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Zuge.Domain.Types.Authentication;

public record RegistrationInformation(
    [Length(1, 100)] string FirstName, 
    [Length(1, 100)] string LastName, 
    [Length(10, 20)] string? PhoneNumber);