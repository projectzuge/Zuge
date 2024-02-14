using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Xunit;

namespace Zuge.Tests;

public class IdentityIntegrationTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async void RegisterAsync()
    {
        // Arrange
        var sut = factory.CreateClient();

        // Act
        var response = await sut.PostAsJsonAsync("account/register", new
        {
            Email = "test@example.com",
            Password = "P@ssw0rd"
        });

        // Assert
        Assert.True(response.IsSuccessStatusCode);
    }
    [Fact]
    public async void LoginAsync()
    {
        // Arrange
        var sut = factory.CreateClient();

        // Act
        var response = await sut.PostAsJsonAsync("account/login", new
        {
            Email = "test@example.com",
            Password = "P@ssw0rd"
        });

        // Assert
        Assert.True(response.IsSuccessStatusCode);
    }
    [Fact]
    public async void FillInfoAsync()
    {
        // Arrange
        var sut = factory.CreateClient();

        // Act
        var response = await sut.PostAsJsonAsync("account/manage/register?email=test@example.com", new
        {
            FirstName = "Test",
            LastName = "Person",
            PhoneNumber = "1234567890"
        });

        // Assert
        Assert.True(response.IsSuccessStatusCode);
    }
}