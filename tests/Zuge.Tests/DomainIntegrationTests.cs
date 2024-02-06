using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Xunit;

namespace Zuge.Tests;

public class DomainIntegrationTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async void PurchaseAsync()
    {
        // Arrange
        var sut = factory.CreateClient();

        // Act
        var response = await sut.PostAsJsonAsync("purchase", new
        {
            CardCvc = "123",
            CardDate = "2025-01-01",
            CardHolder = "DOE JOHN",
            CardNumber = "1111222233334444",
            EmailAddress = "john@doe.com",
            JourneyId = 1
        });

        // Assert
        Assert.True(response.IsSuccessStatusCode);
    }

    [Fact]
    public async void SearchAsync()
    {
        // Arrange
        var sut = factory.CreateClient();

        // Act
        var response = await sut.PostAsJsonAsync("search", new
        {
            Date = DateOnly.FromDateTime(DateTime.Now).ToShortDateString(),
            From = "Tampere",
            To = "Keuruu"
        });

        // Assert
        Assert.True(response.IsSuccessStatusCode);
    }
}