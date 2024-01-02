using Microsoft.AspNetCore.Mvc;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Specifications;
using Zuge.Domain.Types;

namespace Zuge.UI.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class JourneyController(IUnitOfWork unitOfWork) : ControllerBase
{
    [HttpGet]
    public IAsyncEnumerable<Journey> OnGetAsync([FromQuery] DateOnly departure, [FromQuery] string from, [FromQuery] string to) =>
        unitOfWork
            .Repository<Journey>()
            .QueryAsync(new SearchJourneySpecification(departure, from, to));
}