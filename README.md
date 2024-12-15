# Weatherly

#### Project Description

Weatherly is a web-based application designed to provide users with up-to-date weather and air quality information for any desired location. On the homepage, users can search for a city (e.g., Rockville) using the search bar to access real-time weather data, including:

- Max Temperature
- Min Temperature
- Humidity Percentage
- Pressure
- Condition
- Feels like
- Additional Weather Details

The application features an interactive map that visually corresponds to the requested location, offering an intuitive and engaging user experience.

# Air Quality Monitoring

Weatherly also includes a pollution tracker that provides users with insights into:

Pollution Levels for the specific location (PM2.5 and PM10) levels such as the amount of Carbon Monocide, Nitrogen Dioxide, and Sulfur Dioxide 

Air Quality Index (AQI) is color-coded, categorized as:

Good (0-50) 
Moderate (51-100)
Unhealthy for Sensitive Groups (101-150)
Unhealthy (151-200)
Very Unhealthy (201-300)
Hazardous (301-500)

By monitoring air quality, users can make informed decisions about outdoor activities and take necessary precautions to protect their health.

# Target Browsers

Weatherly is optimized for:

Modern Web Browsers on Desktop (e.g., Chrome, Firefox, Edge, Safari)

Mobile Browsers on iOS and Android devices

# Developer Manual

Welcome to the Developer Manual for the Weather Forecast Application. This document serves as a guide for developers who will take over the project. It covers installation, running the application, APIs, testing, known bugs, and future development plans.

---

## Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Testing](#testing)
4. [API Endpoints](#api-endpoints)
5. [Known Bugs](#known-bugs)
6. [Roadmap for Future Development](#roadmap-for-future-development)

---

## Installation

Follow these steps to set up the application and its dependencies on your local machine:

### **Prerequisites**
1. Node.js (v16.x or higher) - [Download Node.js](https://nodejs.org/)
2. NPM (comes with Node.js)
3. A code editor like VSCode
4. A web browser (e.g., Chrome, Firefox)
5. A Supabase project (for the database)
6. An OpenWeather API Key - [Get API Key](https://openweathermap.org/api)

### **Steps to Install**

1. **Clone the Repository**:
   
   ```
   git clone <REPOSITORY_URL>
   cd weather-forecast-app
   ```

3. **Install Dependencies**:
   Navigate to the root of the project directory and run:
   ```
   npm install
   ```
   
This will install all required Node.js packages specified in `package.json`.

4. **Verify Installation**:
   Run the following command to verify all dependencies are installed:
   ```
   npm list
   ```
---

## Running the Application

Once installed, use the following steps to start the application.

1. **Start the Development Server**:
   Run:
   ```
   npm start
   ```
   - The application will be served on `http://localhost:3000`.
   - Changes in the code will trigger automatic reloads.

## Testing












## API Endpoints

Here are the endpoints used by the server-side application:

### **1. POST /city_searches**
- **Purpose**: Logs the city searched by the user into the Supabase database.
- **Request Body**:
  ```json
  {
    "city_name": "<CITY_NAME>"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "City search logged successfully."
  }
  ```

### **2. GET /city_searches**
- **Purpose**: Retrieves the most-searched cities from the database.
- **Response**:
  ```json
  [
    {
      "city_name": "New York",
      "search_count": 12
    },
    {
      "city_name": "Tokyo",
      "search_count": 9
    }
  ]
  ```
  
### **3. External API**
- The application also fetches data from the OpenWeather API:
  - **Endpoint**: `https://api.openweathermap.org/data/2.5/weather?q=<CITY>&appid=<API_KEY>`
  - **Method**: GET
  - **Response**: Weather details for the provided city.

---

## Known Bugs

The following bugs are known and unresolved:
1. **Invalid City Input**: No user-friendly message is displayed when a non-existent city is entered.
2. **Recent Cities Weather**: The weather for recent cities is not fetched dynamically; placeholders are shown.
3. **API Key Exposure**: API keys are stored on the client side, which could lead to security issues.

---

## Roadmap for Future Development

Here are suggested features and improvements for future development:

1. **Dynamic Weather for Recent Cities**:
   - Fetch and display real-time weather data for cities listed under the "Recent Cities" section.

2. **User Authentication**:
   - Integrate Supabase authentication to allow users to log in and save their favorite cities.

3. **Improved Error Handling**:
   - Add user-friendly error messages for invalid city names or failed API requests.

4. **Deployment**:
   - Deploy the app on platforms like Netlify, Vercel, or AWS.

5. **UI/UX Enhancements**:
   - Improve the overall design and responsiveness of the application.

6. **Security**:
   - Move API key usage to a secure backend server.

7. **Testing**:
   - Add more comprehensive unit and integration tests.

---
































