using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types;
using Zuge.Infrastructure.Persistence;

namespace Zuge.UI.Server.IntegrationTests;

public class JourneySearchEndpointTest(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task ReturnsCorrectJourneysGivenQueryString()
    {
        // Arrange
        var client = factory
            .WithWebHostBuilder(builder =>
                builder.ConfigureTestServices(services =>
                    services.AddDbContext<IUnitOfWork, ApplicationDbContext>(options =>
                        options.UseInMemoryDatabase("Zuge"))))
            .CreateClient();

        // Act
        var response = await client.GetAsync("/Journey?departure=2023-12-29&from=Tampere&to=Keuruu");
        response.EnsureSuccessStatusCode();
        var journeys = await response.Content.ReadFromJsonAsync<IEnumerable<Journey>>() ?? [];

        // Assert
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        Assert.NotEmpty(journeys);
    }
}