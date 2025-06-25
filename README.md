# Weather Web App

The goal of this project was to create a single-page weather web application using the [Weather API](https://www.weatherapi.com/).

Utilizes HTML, CSS (CSS Components), JavaScript, React, Axios, i18next, TanStack/React Query

### Features

-   The application uses geolocation and once it is allowed, it will show the current weather conditions for the city where the user is located. If the geolocation is blocked, the app throws an error and allows users to search manually for a city using the search bar in the header.

-   The search field utilizes debouncing and returns auto-complete suggestions.

-   Once a city is selected, the user will be presented with the current temperature and conditions, a breakdown of the temperature/conditions throughout the day in 3-hour intervals, additional information about the air conditions including wind speeds, chance of rain, etc. and a 7-day forecast.

-   In the air conditions tab the user can click a "Show more" button which opens a modal with additional information including wind and atmospheric conditions, sunrise and sunset times, etc.

-   From the header the user can also toggle between °C / °F (metric and imperial system). They can also switch languages and choose between English and Bulgarian. Additionally if geolocation is enabled, clicking the "Weather" title, activates geolocation again and dispays the user's "home" city.

-   The application is responsive using media queries.

### Screenshots

**The Homepage in Desktop/Mobile view**

<div align="center">
  <img src="https://github.com/user-attachments/assets/3e118bf7-ee8c-4783-8167-46287ef72e63" alt="Homepage - desktop" />
  <br />
  <img src="https://github.com/user-attachments/assets/dc634056-c931-4ff6-90d6-4c50f47ed538" alt="Homepage - mobile" />
</div>

<br />
<br />

**The "Show more" modal window in Desktop/Mobile view**

<div align="center">
  <img src="https://github.com/user-attachments/assets/d81ef4bb-a7e9-4c2b-a7fa-aad59baab72f" alt="Modal - desktop" />
  <br />
  <img src="https://github.com/user-attachments/assets/421da6ef-f512-40d4-896c-45f192dc5c50" alt="Modal - mobile" />
</div>
