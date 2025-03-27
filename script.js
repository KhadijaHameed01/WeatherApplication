const apikey = '5e96662af1edd5bb0e25aac90d9dee18';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


const searchBox = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const forecastContainer = document.querySelector('.forecast-slider'); 

async function checkWeather(city) {
    if (!city) return; 

    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    const data = await response.json();

    if (data.cod !== 200) {
        alert("City not found! Please try again.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';

 
    const weatherCondition = data.weather[0].main;
    const iconMap = {
        'Clouds': 'clouds.png',
        'Clear': 'clear.png',
        'Rain': 'rain.png',
        'Drizzle': 'drizzle.png',
        'Mist': 'mist.png'
    };
    weatherIcon.src = `images/${iconMap[weatherCondition] || 'default.png'}`;
}




searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('input',(event)=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        checkWeather(event.target.value);
    }, 450);
}
)
checkWeather("New York");
