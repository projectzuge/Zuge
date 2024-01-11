using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Zuge.Domain.Types.Authentication;

public record RegistrationInformation(
    [Length(2, 100)] string FirstName, 
    [Length(2, 100)] string LastName, 
    [DataType(DataType.EmailAddress)] string Email, 
    [MinLength(6)] string Password, 
    [Length(10, 20)] string? PhoneNumber);