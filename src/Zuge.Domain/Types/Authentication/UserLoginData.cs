using System.Security.Cryptography;

namespace Zuge.Domain.Types.Authentication;

public record UserLoginData(
    //DateTime TokenGenerationTime,
    //DateTime EmailValidationTime,
    //DateTime RecoveryTokenGenerationTime,
    //HashingAlgorithm HashingAlgorithm,
    Guid UserAccountId,
    Guid PasswordSalt,
    string PasswordHash,
    //int HashingAlgorithmId = 0,
    string Email,
    UserAccount? UserAccount
    //string ConfirmationToken,
    //string PasswordRecoveryToken
    )
{
    UserLoginData() : this(Guid.Empty, Guid.Empty, "", "", null) { }
}