const APIKEY = '2c21e65a76f343bc803123042242608'; // Replace with your API key
const btn = document.getElementById('btn');
const input = document.getElementById('input');

const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localtime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');
const weatherIcon = document.getElementById('icon');
const outputCard = document.getElementById('outputCard');
const themeToggleBtn = document.getElementById('theme-toggle');

// Toggle dark mode on and off
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.title-card').classList.toggle('dark-mode');
    document.querySelector('.card').classList.toggle('dark-mode');
    outputCard.classList.toggle('dark-mode');
    btn.classList.toggle('dark-mode');
    themeToggleBtn.classList.toggle('dark-mode');
    weatherIcon.classList.toggle('dark-mode');
});

async function getWeatherData(city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`);
    const data = await response.json();
    return data;
}

btn.addEventListener('click', async () => {
    const city = input.value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const weatherData = await getWeatherData(city);

    if (weatherData.error) {
        alert("City not found. Please try again.");
        return;
    }

    // Display weather data
    cityName.innerText = `${weatherData.location.name}, ${weatherData.location.region}`;
    countryName.innerText = weatherData.location.country;
    temp.innerText = weatherData.current.temp_c;
    sup.innerText = '°C';
    localtime.innerText = `Local time: ${weatherData.location.localtime}`;
    weatherIcon.src = weatherData.current.condition.icon;
    weatherIcon.alt = weatherData.current.condition.text;

    // Show the output card
    outputCard.style.display = 'block';
});
