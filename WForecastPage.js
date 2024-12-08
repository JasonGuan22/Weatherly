// API Key = a16064f36be0fca16ada9c72c539273d

// To Make a API call: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=a16064f36be0fca16ada9c72c539273d

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");

    if (city) {
        document.getElementById("location-name").textContent = city;
        fetchWeatherData(city);
    } else {
        document.getElementById("location-name").textContent = "Unknown Location";
        alert("City not provided. Please go back and enter a city name.");
    }

    function fetchWeatherData(city) {
        const apiKey = "a16064f36be0fca16ada9c72c539273d"
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                updateWeatherDetails(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Error fetching weather data. Please try again.");
            });
    }

    function updateWeatherDetails(data) {
        const { main, weather, name } = data;
        document.getElementById("location-name").textContent = name;
        document.querySelector(".weather-info .weather-card:nth-child(1) p").textContent = `${main.temp}°C`;
        document.querySelector(".weather-info .weather-card:nth-child(2) p").textContent = weather[0].description;
        document.querySelector(".weather-info .weather-card:nth-child(3) p").textContent = `${main.humidity}%`;
    }

    "main":{
        "temp":306.15, //current temperature
        "pressure":1013,
        "humidity":44,
        "temp_min":306.15, //min current temperature in the city
        "temp_max":306.15 //max current temperature in the city
      }
     



});