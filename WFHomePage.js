// Redirect to the forecast page with the city name 

// API Key = a16064f36be0fca16ada9c72c539273d

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


document.getElementById("cityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        window.location.href = `WForecast.html?city=${encodeURIComponent(city)}`;
    } else {
        alert("Please enter a city name.");
    }
});





