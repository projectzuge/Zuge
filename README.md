# Members

- Jani Meronen
- Arttu Knuutinen
- Saara Sairanen
- Tommy Niemi
- Aleksandra Babenko

# Project description

  Zuge is a project created during Buutti Trainee Academy 2023, Tampere.
  
  The goal is to learn and showcase the skills necessary for a software developer.

# Getting started

- ## Prerequisites
  [.NET 8](https://dotnet.microsoft.com/en-us/download)
  
  [Node.js 18+](https://nodejs.org/en/download)

  npm ```npm install -g npm```

- ## Installation
  Run in ```src/Zuge.UI/zuge.ui.client```
  ```
  npm -install
  ```
  
- ## Usage
  Run in ```src/Zuge.UI/Zuge.UI.Server```:
  ```
  dotnet run
  ```
  Open browser, navigate to:
  ```
  http://localhost:5173
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

### Frontpage:

Frontpage on the computer:
![Wide screen](https://github.com/projectzuge/Zuge/assets/153619765/be8b51ad-2270-4005-bedd-361106f90813)

Frontpage on the phone, dropdown menu opened:
![Phone screen](https://github.com/projectzuge/Zuge/assets/153619765/38c82215-61fa-4aaf-a298-92d1cf408e80)

### Responsiveness:

All the components are responsive from a screen width of 320 pixels upwards.


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


# ToDo in the future:

- Send ticket to email
- Make routes for all cities
- Confirmation email to user email
- Give the user a carriage and seat numbers
- Create personnel role and pages to manage routes, users and news
- Support for different languages (EN, SE)
- Make it possible for the user to change their password


