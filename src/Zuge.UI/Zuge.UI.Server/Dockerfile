FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs

FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Zuge.UI/zuge.ui.client/nuget.config", "src/Zuge.UI/zuge.ui.client/"]
COPY ["src/Zuge.UI/Zuge.UI.Server/Zuge.UI.Server.csproj", "src/Zuge.UI/Zuge.UI.Server/"]
COPY ["src/Zuge.Domain/Zuge.Domain.csproj", "src/Zuge.Domain/"]
COPY ["src/Zuge.Infrastructure/Zuge.Infrastructure.csproj", "src/Zuge.Infrastructure/"]
COPY ["src/Zuge.UI/zuge.ui.client/zuge.ui.client.esproj", "src/Zuge.UI/zuge.ui.client/"]
RUN dotnet restore "./src/Zuge.UI/Zuge.UI.Server/Zuge.UI.Server.csproj"
COPY . .
WORKDIR "/src/src/Zuge.UI/Zuge.UI.Server"
RUN dotnet build "./Zuge.UI.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Zuge.UI.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Zuge.UI.Server.dll"]