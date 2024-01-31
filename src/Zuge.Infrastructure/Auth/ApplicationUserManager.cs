using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zuge.Infrastructure.Auth.Entities;

namespace Zuge.Infrastructure.Auth
{
    public class ApplicationUserManager(IUserStore<ApplicationUser> store,
        IOptions<IdentityOptions> optionsAccessor, 
        IPasswordHasher<ApplicationUser> passwordHasher,
        IEnumerable<IUserValidator<ApplicationUser>> userValidators,
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators,
        ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors,
        IServiceProvider services, ILogger<UserManager<ApplicationUser>> logger) 
        : 
        UserManager<ApplicationUser>(store,
            optionsAccessor, 
            passwordHasher, 
            userValidators, 
            passwordValidators,
            keyNormalizer,
            errors, 
            services,
            logger)
    {

    }
}
