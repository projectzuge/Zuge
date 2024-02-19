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

### Payment page

Payment uses react-creditcard-validator to check errors in CVC and date. Card number is checked with [Luhn's algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). Input fields use react-input-mask to constrain user inputs, and react-toastify to give toast in case of error:

#### Some images:

Basic view of the payment form:
![image](https://github.com/projectzuge/Zuge/assets/73687931/a352d664-efc8-446c-b25c-9552284ef892)

Working card number. The image also shows how it handles errors in input (red borders and error text) and in the actual payment (incorrect card info -> react-toastify toast):
![image](https://github.com/projectzuge/Zuge/assets/73687931/d805d21b-6608-428d-99ff-c5df12ab4598)

Successful purchase:
![image](https://github.com/projectzuge/Zuge/assets/73687931/e21e77af-b677-460e-9d05-b2e43b3d8d0c)


### To test buying the ticket:

- Select from and to cities from the list (the cities have to be different in order to continue)
  - Working date is **current date**
- Click "Hae matkoja"
- Click journey from the component that appeared on the right or below
- In /route click "Vahvista matka (price)"
- In /revise add email to "Lipun toimitus"
- Click "Maksukortti"
- In /payment add card number **4242 4242 4242 4242** to test successful purchase, and **5555 5555 5555 4444** to test valid card number in frontend but one that doesn't go through in backend
  - "Etunimi" and "sukunimi" cannot be empty
  - "Viimeinen voimassaolopäivä" only has to be in the future
  - "CVC" has to be three numbers
- When ready, click "Maksa"

#### Note!

When clicking "Takaisin" the app navigates one page back. Selected routes are saved in sessionStorage and therefore the user doesn't always have to start from the beginning.

SessionStorage is emptied when the purchase is done or after 60 minutes.

### ! Use any email - there is no functionality to send the ticket to user !

### ToDo in the future:

- Send ticket to email
- Make routes for all cities
- Confirmation email to user email
