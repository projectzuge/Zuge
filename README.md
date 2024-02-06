# Jäsenet

- Jani Meronen
- Arttu Knuutinen
- Saara Sairanen
- Tommy Niemi
- Aleksandra Babenko

# Käynnistäminen

Aja projektin juuressa:
```
docker compose up
```

Siirry selaimella osoitteeseen:
```
http://localhost:5197
```

# Entity Framework Core

Polku jossa kommennot suoritetaan:
```
C:\Users\Buutti\source\repos\Zuge
```

Add Migration
```
"C:\Program Files\dotnet\dotnet.exe" ef migrations add --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --context Zuge.Infrastructure.Persistence.ZugeContext --configuration Debug Initial --output-dir Persistence/Migrations
```

Remove Last Migration
```
"C:\Program Files\dotnet\dotnet.exe" ef migrations remove --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --context Zuge.Infrastructure.Persistence.ZugeContext --configuration Debug --force
```

Generate SQL Script
```
"C:\Program Files\dotnet\dotnet.exe" ef migrations script --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --context Zuge.Infrastructure.Persistence.ZugeContext --configuration Debug 0 20231229165221_Initial --output script.sql
```

Update Database
```
"C:\Program Files\dotnet\dotnet.exe" ef database update --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --context Zuge.Infrastructure.Persistence.ZugeContext --configuration Debug 20231229165221_Initial
```

Drop Database
```
"C:\Program Files\dotnet\dotnet.exe" ef database drop --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --context Zuge.Infrastructure.Persistence.ZugeContext --configuration Debug --force
```

Scaffold DbContext
```
"C:\Program Files\dotnet\dotnet.exe" ef dbcontext scaffold --project src\Zuge.Infrastructure\Zuge.Infrastructure.csproj --startup-project src\Zuge.UI\Zuge.UI.Server\Zuge.UI.Server.csproj --configuration Debug Database=Data;Host=db;Password=postgres;Username=postgres Npgsql.EntityFrameworkCore.PostgreSQL --context ZugeDbContext --context-dir Context --force --output-dir Persistence/Migrations
```

# Frontend

### Tools, frameworks and libraries:

- vite (^5.0.8)
- react (^18.2.0)
- materialUI
- axios (^1.6.3)
- dayJS (^1.11.10)
- moment (^2.29.4)
- react-input-mask (^2.0.4)
- react-router-dom (^6.21.1)
- react-toastify (^10.0.4)
