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
- vitest (^1.2.2)

### MaterialUI

#### ThemeProvider

Used for themes that need to be consistent across application, such as
- button colors
- button borders and other styles
- font family
- different font variants
- font colors

#### Other theme configurations

In the project, no matter if light or dark theme, the light color used was #eeeeee and dark color #262626. In component backgrounds light version was rgba(222, 222, 222, 0.95) and dark version rgba(51, 51, 51, 0.98).
This color theme was carried all the way through project to keep the style consistent and simple because of image backgrounds. Error borders were kept red, and in Profile the "Tallenna" button uses green color.

### Frontpage:

Frontpage on the computer:
![Wide screen](https://github.com/projectzuge/Zuge/assets/153619765/be8b51ad-2270-4005-bedd-361106f90813)

Frontpage on the phone, dropdown menu opened:
![Phone screen](https://github.com/projectzuge/Zuge/assets/153619765/38c82215-61fa-4aaf-a298-92d1cf408e80)

### Responsiveness:

All the components are responsive from a screen width of 320 pixels upwards.

Navigation bar has a hamburger dropdown menu with all the navigation options except the frontpage if screen widths is under 480 pixels.


### Payment page

Payment uses react-creditcard-validator to check errors in CVC and date. Card number is checked with [Luhn's algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm). Input fields use react-input-mask to constrain user inputs, and react-toastify to give toast in case of error.

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

SessionStorage is emptied when the purchase is done.

### ! Use any email - there is no functionality to send the ticket to user !


### Login:

#### Opening the Login:
Clicking "Käyttäjä" opens the login form.

#### Try any email and password:
- Login only accepts emails that has "@" in the middle, special characters are not allowed, except "." and "_" and only letters a - z and A - Z are allowed. Email needs to have some characters before and after the "@" character. Domain part needs to have ".fi", ".com" or similar acceptable TLD.
- Passwords needs to have 6 to 100 characters, atleast one small letter, capital letter, number and a special character.
- The fields doesn't accept unallowed characters.
- Clicking "Peruuta" or clicking outside login menu will close the menu and empty the text fields.

#### Clicking "Rekisteröidy":
Clicking "Rekisteröidy" opens the register form.


### Register:

Register can be reached from login form (read Login).

#### Inputs:
- Email field accepts emails that has "@" in the middle, special characters are not allowed, except "." and "_" and only letters a - z and A - Z are allowed. Email needs to have some characters before and after the "@" character. Domain part needs to have ".fi", ".com" or similar acceptable TLD.
- Passwords needs to have 6 to 100 characters, atleast one small letter, capital letter, number and a special character.
- Passwords needs to match.
- The email and password fields doesn't accept unallowed characters.
- Name fields has to be 1 to 100 characters long, accepts only small and capital letters from a to ö and A to Ö, spaces and "-", other special characters and numbers are not allowed.
- Phone number only accepts numbers and needs to be 10 to 15 characters long. Country code or spaces are not allowed.
- All fields must have an acceptable value to register.
- Navigating to other pages will empty the text fields.


If none of the fields are red and the email is not already in the database, then clicking registration results in a successful registration. The user data is saved to the database and the user sees the registration successful -page. 

Clicking "Etusivulle" navigates to the front page on both registration form and registration successful -page.

### Profile:

When user has registered and logged in, they can navigate to Profile by clicking their name on menubar that creates a dropdown with options to go to Profile of to log out.

#### OMAT TIEDOT:

Basic view of the profile page with user info:
![image](https://github.com/projectzuge/Zuge/assets/73687931/49c5a7bc-9f9a-4cf6-939c-cf682c7d751b)

When some info is changed, a button "Tallenna" to save changes appears. The image also shows the error it gives with wrong inputs (in this case a too short phone number)
![image](https://github.com/projectzuge/Zuge/assets/73687931/c39e39ff-f7fc-4b43-8bb3-158c7efb2ab2)

Toasts are there to notify the user if the change was successful or not.

#### LIPPUSI:

Basic view of bought tickets (upcoming and old). These have no functionality, and the tickets are now created with dummy data.
![image](https://github.com/projectzuge/Zuge/assets/73687931/052c0e61-553a-4809-9c3e-edb7a27b452e)


# ToDo in the future:

- Send ticket to email
- Make routes for all cities
- Confirmation email to user email
- Give the user a carriage and seat numbers
- Create personnel role and pages to manage routes, users and news
- Support for different languages (EN, SE)
- Make it possible for the user to change their password


