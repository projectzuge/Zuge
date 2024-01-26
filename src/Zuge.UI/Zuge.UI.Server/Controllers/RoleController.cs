//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Zuge.Infrastructure.Auth;

//namespace Zuge.UI.Server.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    [Authorize(Policy = "Admin")]
//    public class RoleController(RoleManager<IdentityRole> roleManager, AuthenticationDbContext authenticationDbContext) : ControllerBase
//    {
//        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
//        private readonly AuthenticationDbContext _authenticationDbContext = authenticationDbContext;

//        [HttpGet]
//        public IActionResult Get()
//        {
//            var roles = _authenticationDbContext.Roles.ToList();
//            return Ok(roles);
//        }
//    }
//}