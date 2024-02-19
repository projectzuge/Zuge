namespace Zuge.Tests;

using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Xunit;

public class DomainIntegrationTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    async void PurchaseTicketAsync()
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
    async void SearchJourneysAsync()
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