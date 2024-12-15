// Redirect to the Weather forecast page once users input their city name

document.getElementById("cityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        window.location.href = `WForecast.html?city=${encodeURIComponent(city)}`;
    } else {
        alert("Please enter a city name.");
    }
});

// Displays the weather forecast for random cities across the world

document.addEventListener("DOMContentLoaded", function() {

    // Array of random cities
    const cities = [
        "London", "New York", "Tokyo", "Paris", "Sydney", "Berlin", "Moscow", "Cape Town",
        "Rio de Janeiro", "Los Angeles", "Seoul", "Dubai", "Toronto", "Mexico City", "Cairo",
        "Rome", "Amsterdam", "Bangkok", "Singapore", "Hong Kong", "San Francisco", "Barcelona",
        "Lagos", "Buenos Aires", "Jakarta", "Kuala Lumpur", "Madrid", "Lima", "Mumbai",
        "Chennai", "Shanghai", "Istanbul", "Vancouver", "Santiago"
    ];

    function getRandomCity() {
        const randomIndex = Math.floor(Math.random() * cities.length);
        return cities[randomIndex];
    }

    // Function to fetch weather data for the selected city from the random cities array
    function getWeatherForCity(city) {
        const apiKey = "a16064f36be0fca16ada9c72c539273d"; // Replace with your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Metric units for Celsius

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeatherInfo(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    // Update weather information for the random cities in the home page
    function updateWeatherInfo(data) {
        // Extract necessary data
        const { main, weather } = data;
        
        // Convert temperature from Celsius to Fahrenheit
        const tempInFahrenheit = (main.temp * 9/5) + 32;
        
        // Temperature
        const tempElement = document.querySelector(".weather-section .weather-card:nth-child(1) p");
        if (tempElement) {
            tempElement.textContent = `${tempInFahrenheit.toFixed(1)}°F`; // Display temperature in Fahrenheit
        }

        // Condition
        const conditionElement = document.querySelector(".weather-section .weather-card:nth-child(2) p");
        if (conditionElement) {
            conditionElement.textContent = weather[0].description;
        }

        // Humidity
        const humidityElement = document.querySelector(".weather-section .weather-card:nth-child(3) p");
        if (humidityElement) {
            humidityElement.textContent = `${main.humidity}%`;
        }
    }

    // Get a random city and update the title with city name
    const randomCity = getRandomCity();
    const weatherTitleElement = document.querySelector(".weather-section h2");

    if (weatherTitleElement) {
        weatherTitleElement.textContent = `Current Weather in ${randomCity}`;
    }

    // Fetch weather data for the random city 
    getWeatherForCity(randomCity);
});


// Using SupaBase 

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the most searched cities when the page loads
  fetch('/city_searches')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      const recentCitiesContainer = document.querySelector('.weather-section');
      if (!recentCitiesContainer) {
        console.error('weather-section container not found');
        return;
      }

      recentCitiesContainer.innerHTML = '';

      if (data.length > 0) {
        data.forEach(city => {
          console.log(city)
          // Fetch weather data for each city
          fetchWeatherForCity(city.city_name).then(weatherData => {
            const cityElement = document.createElement('div');
            console.log(weatherData)
            cityElement.classList.add('city-item');
            cityElement.innerHTML = `
              <h4>Weather Details for ${city.city_name}</h4>
              <div class="weather-info">
                <div class="weather-card">
                  <h3>Temperature</h3>
                  <p>${weatherData.temperature}°F</p>
                </div>
                <div class="weather-card">
                  <h3>Condition</h3>
                  <p>${weatherData.condition}</p>
                </div>
                <div class="weather-card">
                  <h3>Humidity</h3>
                  <p>${weatherData.humidity}%</p>
                </div>
              </div>
            `;
            recentCitiesContainer.appendChild(cityElement);
          }).catch(error => {
            console.error(`Error fetching weather for ${city.city_name}:`, error);
          });
        });
      } else {
        console.log('No cities to display');
      }
    })
    .catch(error => {
      console.error('Error fetching cities:', error);
    });

  // Handle form submission for new city search
  const cityForm = document.getElementById("cityForm");
  cityForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value.trim();

    if (!cityName) {
      alert('Please enter a city name');
      return;
    }

    // Send the city name to the server to update search count
    fetch('/city_searches', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city_name: cityName })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update city data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      alert('City search count updated successfully!');
      cityInput.value = '';

      // Re-fetch the updated cities and display them
      fetch('/city_searches')
        .then(response => response.json())
        .then(newData => {
          const recentCitiesContainer = document.querySelector('.weather-section');
          recentCitiesContainer.innerHTML = '';

          if (Array.isArray(newData) && newData.length > 0) {
            newData.forEach(city => {
              fetchWeatherForCity(city.city_name).then(weatherData => {
                const cityElement = document.createElement('div');
                cityElement.classList.add('city-item');
                cityElement.innerHTML = `
                  <h4>Weather Details for ${city.city_name}</h4>
                  <div class="weather-info">
                    <div class="weather-card">
                      <h3>Temperature</h3>
                      <p>${weatherData.temperature}°F</p>
                    </div>
                    <div class="weather-card">
                      <h3>Condition</h3>
                      <p>${weatherData.condition}</p>
                    </div>
                    <div class="weather-card">
                      <h3>Humidity</h3>
                      <p>${weatherData.humidity}%</p>
                    </div>
                  </div>
                `;
                recentCitiesContainer.appendChild(cityElement);
              }).catch(error => {
                console.error(`Error fetching weather for ${city.city_name}:`, error);
              });
            });
          } else {
            console.log('No cities to display');
          }
        })
        .catch(error => {
          console.error('Error fetching updated cities:', error);
        });
    })
    .catch(error => {
      console.error('Error sending city data:', error);
      alert('An error occurred. Please try again.');
    });
  });

  // Function to fetch weather data for a given city
  function fetchWeatherForCity(cityName) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a16064f36be0fca16ada9c72c539273d&units=imperial`;

    return fetch(weatherApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(weatherData => {
        return {
          temperature: weatherData.main.temp,
          condition: weatherData.weather[0].description,
          humidity: weatherData.main.humidity
        };
      });
  }
});








