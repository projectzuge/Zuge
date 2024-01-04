using Microsoft.AspNetCore.Mvc;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Specifications;
using Zuge.Domain.Types;

namespace Zuge.UI.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class JourneyController(IDomainUnitOfWork unitOfWork) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> OnGetAsync([FromQuery] DateOnly departure, [FromQuery] string from, [FromQuery] string to)
    {
        var journeys = await unitOfWork.Repository<Journey>().ListAsync(new SearchJourneySpecification(departure, from, to));

        var result = journeys.ConvertAll(journey => new
        {
            date = $"{journey.Date.Day}.{journey.Date.Month}.{journey.Date.Year}",
            duration = new
            {
                hours = journey.Duration.Hours,
                minutes = journey.Duration.Minutes
            },
            id = journey.Id.ToString(),
            price = journey.Price,
            stops = journey.Stops.ConvertAll(stop => new
            {
                arrival = stop.Arrival.ToShortTimeString(),
                departure = stop.Arrival.ToShortTimeString(),
                station = stop.Station
            }),
            train = $"{journey.Train.Type} {journey.Train.LineNumber}"
        });

        return Ok(result);
    }
}