using Microsoft.EntityFrameworkCore;

namespace Zuge.Infrastructure.Authentication;

public class AuthenticationContext(DbContextOptions<AuthenticationContext> options) : DbContext(options)
{
    
}