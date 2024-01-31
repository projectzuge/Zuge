using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zuge.Infrastructure.Auth.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(100, MinimumLength = 1)]
        [PersonalData]
        public string? FirstName { get; set; }
        [StringLength(100, MinimumLength = 1)]
        [PersonalData]
        public string? LastName { get; set; }
    }
}
