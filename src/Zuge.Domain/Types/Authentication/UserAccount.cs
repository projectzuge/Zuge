namespace Zuge.Domain.Types.Authentication;

public record UserAccount(
    Guid Id, 
    string FirstName,
    string LastName,
    string Email,
    string? PhoneNumber,
    //int RoleId, 
    //DateTime RegistrationTime, 
    UserLoginData UserLoginData
    //IEnumerable<UserLoginDataExternal> UserLoginDataExternals,
    //UserRole? Role
    )
{
    UserAccount() : this(Guid.Empty, string.Empty, string.Empty, string.Empty, string.Empty, new(Guid.Empty, Guid.Empty, "", "", null)) { }
}