const api = {
  key: '065e59b2def287cba1ade3fe142d7bc4',
  baseurl: 'https://api.openweathermap.org/data/2.5/'
}

initialiseSearchField();

function initialiseSearchField() {
  const searchField = document.querySelector('.search-field');
  searchField.addEventListener('keypress', setQuery);
  searchField.focus();
}

function setQuery(event) {
  const searchField = document.querySelector('.search-field');
  if (event.keyCode === 13) {
    getResults(searchField.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  const UTC = timezoneToUTC(weather.timezone);

  displayCityName(weather);
  displayDateAndTime(weather, UTC);
  displaySunriseTime(weather, UTC);
  displaySunsetTime(weather, UTC);
  displayCoordinates(weather);
  displayWeatherDescription(weather);
  displayVisibility(weather);
  displayPressure(weather);
  displayHumidity(weather);
  displayTimezone(weather, UTC);
  displayCloudiness(weather);
  displayFeelsLike(weather);
  displayWind(weather);
  displayLow(weather);
  displayHigh(weather);
  displayTemperature(weather);
}

function displayCityName(weather) {
  const searchField = document.querySelector('.search-field');
  if (weather.cod === 200) {
    searchField.value = `${weather.name}, ${weather.sys.country}`;
  } else {
    searchField.value = 'City not found...';
  }
}

function displayDateAndTime(weather, UTC) {
  const months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateFromIANA = new Date().toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const dateArray = dateFromIANA.split(/(\s+)/);
  const dateText = dateArray[0].substring(0, dateArray[0].length - 1);
  const dateTextArray = dateText.split(/(\/)/);
  const formattedDateText = `${dateTextArray[2]}/${dateTextArray[0]}/${dateTextArray[4]}`;
  const dateObject = new Date(formattedDateText);
  const day = days[dateObject.getDay()];
  const date = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  const time = dateArray[2].substring(0, dateArray[2].length - 3);
  const period = dateArray[4].toUpperCase();
  
  const dateTimeText = document.querySelector('.date-time-text');
  dateTimeText.innerHTML = `${day} ${time}${period}`;
}


function displaySunriseTime(weather, UTC) {
  const sunriseDate = new Date(weather.sys.sunrise * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunriseDateArray = sunriseDate.split(/(\s+)/);
  const sunriseTime = sunriseDateArray[2].substring(0, sunriseDateArray[2].length - 3);
  const sunrisePeriod = sunriseDateArray[4].toUpperCase();
  const formattedSunriseTime = `${sunriseTime}${sunrisePeriod}`;
  const sunriseText = document.querySelector('.sunrise-text');
  sunriseText.innerText = formattedSunriseTime;
}

function displaySunsetTime(weather, UTC) {
  const sunsetDate = new Date(weather.sys.sunset * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunsetDateArray = sunsetDate.split(/(\s+)/);
  const sunsetTime = sunsetDateArray[2].substring(0, sunsetDateArray[2].length - 3);
  const sunsetPeriod = sunsetDateArray[4].toUpperCase();
  const formattedSunsetTime = `${sunsetTime}${sunsetPeriod}`;
  const sunsetText = document.querySelector('.sunset-text');
  sunsetText.innerText = formattedSunsetTime;
}

function displayCoordinates(weather) {
  const latitude = weather.coord.lat;
  const longitude = weather.coord.lon;
  const latitudeText = document.querySelector('.latitude-text');
  latitudeText.innerText = latitude;
  const longitudeText = document.querySelector('.longitude-text');
  longitudeText.innerText = longitude;
}

function displayWeatherDescription(weather) {
  const weatherDescriptionString = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
  const weatherDescriptionText = document.querySelector('.weather-description-text');
  weatherDescriptionText.innerText = weatherDescriptionString;
}

function displayVisibility(weather) {
  const visibilityText = document.querySelector('.visibility-number');
  if ('visibility' in weather) {
    const visibilityNumber = weather.visibility.toString().substring(0, 2);
    visibilityText.innerText = `${visibilityNumber}km`;
  } else {
    visibilityText.innerText = 'No data';
  }
}

function displayPressure(weather) {
  const pressureText = document.querySelector('.pressure-text');
  pressureText.innerText = weather.main.pressure;
}

function displayHumidity(weather) {
  const humidityText = document.querySelector('.humidity-text');
  humidityText.innerText = weather.main.humidity;
}

function displayTimezone(weather, UTC) {
  const timezoneText = document.querySelector('.timezone-number');
  timezoneText.innerText = `${UTC}`;
}

function displayCloudiness(weather) {
  const cloudinessText = document.querySelector('.cloudiness-number');
  cloudinessText.innerText = weather.clouds.all;
}

function displayFeelsLike(weather) {
  const feelsLikeText = document.querySelector('.feels-like-number');
  feelsLikeText.innerText = `${Math.floor(weather.main.feels_like)}°c`;
}

function displayWind(weather) {
  const windText = document.querySelector('.wind-number');
  windText.innerText = Math.floor(weather.wind.speed);
  const windArrow = document.querySelector('.wind-arrow');
  windArrow.style.transform = `rotate(${weather.wind.deg}deg)`;
}

function displayLow(weather) {
  const lowText = document.querySelector('.low-number');
  lowText.innerText = Math.floor(weather.main.temp_min);
}

function displayHigh(weather) {
  const highText = document.querySelector('.high-number');
  highText.innerText = Math.floor(weather.main.temp_max);
}

function displayTemperature(weather) {
  const temperatureText = document.querySelector('.temperature-number');
  temperatureText.innerText = Math.floor(weather.main.temp);
}

function timezoneToUTC(timezone) {
  let UTC = timezone / 3600;
  if (UTC > 0) UTC = `+${UTC}`;
  return UTC;
}

function IANATimezoneBuilder(UTC) {
  const timezones = { 
    '-11': 'Pacific/Niue', 
    '-10': 'Pacific/Honolulu', 
    '-9': 'America/Anchorage',
    '-8': 'America/Los_Angeles',
    '-7': 'America/Phoenix',
    '-6': 'America/Mexico_City',
    '-5': 'America/New_York',
    '-4': 'America/Santiago',
    '-3': 'America/Argentina/Buenos_Aires',
    '-2': 'Atlantic/South_Georgia',
    '-1': 'Atlantic/Cape_Verde',
    '0': 'Europe/London',
    '1': 'Europe/Berlin',
    '2': 'Africa/Cairo',
    '3': 'Europe/Moscow',
    '4': 'Asia/Dubai',
    '5': 'Asia/Karachi',
    '6': 'Asia/Dhaka',
    '7': 'Asia/Jakarta',
    '8': 'Asia/Shanghai',
    '9': 'Asia/Tokyo',
    '10': 'Australia/Sydney',
    '11': 'Pacific/Norfolk',
    '12': 'Pacific/Auckland',
    '13': 'Pacific/Enderbury',
    '14': 'Pacific/Kiritimati'
  }
  return timezones[UTC];
}

