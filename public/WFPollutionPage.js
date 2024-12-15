// API Key = a16064f36be0fca16ada9c72c539273d

const pollutionForm = document.getElementById('pollutionForm');
const cityInput = document.getElementById('cityInput');
const aqiValue = document.querySelector('.aqi-card:nth-child(1) .aqi-value');
const aqiStatus = document.querySelector('.aqi-card:nth-child(1) .aqi-status');
const coValue = document.querySelector('.co-value');
const no2Value = document.querySelector('.no2-value');
const so2Value = document.querySelector('.so2-value');
const pollutionChart = document.getElementById('pollutionChart');
const API_KEY = "a16064f36be0fca16ada9c72c539273d";

pollutionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('Please enter a valid city name.');
        return;
    }

    try {
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        if (geocodingData.length === 0) {
            alert('City not found. Please enter a valid city name.');
            return;
        }

        const { lat, lon } = geocodingData[0];
        const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const pollutionResponse = await fetch(pollutionUrl);
        const pollutionData = await pollutionResponse.json();

        if (!pollutionData || !pollutionData.list || pollutionData.list.length === 0) {
            alert('Air pollution data not available for the selected location.');
            return;
        }

        const pollutionInfo = pollutionData.list[0];
        const aqi = pollutionInfo.main.aqi;
        const components = pollutionInfo.components;

        // Update AQI data
        aqiValue.textContent = aqi;
        const aqiStatuses = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
        aqiStatus.textContent = aqiStatuses[aqi - 1] || "Unknown";
        coValue.textContent = `${components.co} μg/m³`;
        no2Value.textContent = `${components.no2} μg/m³`;
        so2Value.textContent = `${components.so2} μg/m³`;

        // Create or update chart
        if (window.pollutionChartInstance) {
            window.pollutionChartInstance.data.datasets[0].data = [components.co, components.no2, components.so2];
            window.pollutionChartInstance.update();
        } else {
            window.pollutionChartInstance = new Chart(pollutionChart, {
                type: 'pie',
                data: {
                    labels: ['CO (Carbon Monoxide)', 'NO₂ (Nitrogen Dioxide)', 'SO₂ (Sulfur Dioxide)'],
                    datasets: [{
                        label: 'Pollution Levels (μg/m³)',
                        data: [components.co, components.no2, components.so2],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.error('Error fetching pollution data:', error);
        alert('An error occurred while fetching the data. Please try again later.');
    }
});