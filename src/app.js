const api = {
  key: '065e59b2def287cba1ade3fe142d7bc4',
  baseurl: 'http://api.openweathermap.org/data/2.5/'
}

const searchField = document.querySelector('.search-field');
searchField.addEventListener('keypress', setQuery);

function setQuery(event) {
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
  
  // Sunrise Time
  const sunriseDate = new Date(weather.sys.sunrise * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunriseDateArray = sunriseDate.split(/(\s+)/);
  const sunriseTime = sunriseDateArray[2].substring(0, sunriseDateArray[2].length - 3);
  const sunrisePeriod = sunriseDateArray[4].toUpperCase();
  const formattedSunriseTime = `${sunriseTime}${sunrisePeriod}`;
  const sunriseText = document.querySelector('.sunrise-text');
  sunriseText.innerText = formattedSunriseTime;

  // Sunset Time
  const sunsetDate = new Date(weather.sys.sunset * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunsetDateArray = sunsetDate.split(/(\s+)/);
  const sunsetTime = sunsetDateArray[2].substring(0, sunsetDateArray[2].length - 3);
  const sunsetPeriod = sunsetDateArray[4].toUpperCase();
  const formattedSunsetTime = `${sunsetTime}${sunsetPeriod}`;
  const sunsetText = document.querySelector('.sunset-text');
  sunsetText.innerText = formattedSunsetTime;

  // Weather Description
  const weatherDescriptionString = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);
  const weatherDescriptionText = document.querySelector('.weather-description-text');
  weatherDescriptionText.innerText = weatherDescriptionString;

  // Coordinates
  const latitude = weather.coord.lat;
  const longitude = weather.coord.lon;
  const latitudeText = document.querySelector('.latitude-text');
  latitudeText.innerText = latitude;
  const longitudeText = document.querySelector('.longitude-text');
  longitudeText.innerText = longitude;

  // City name
  searchField.value = `${weather.name}, ${weather.sys.country}`;
  
  console.log(weather);
  // Visibility
  const visibilityText = document.querySelector('.visibility-text');
  if ('visibility' in weather) {
    const visibilityNumber = weather.visibility.toString().substring(0, 2);
    visibilityText.innerText = `${visibilityNumber}km`;
  } else {
    visibilityText.innerText = 'No data';
  }

  // Feels Like
  const feelsLikeText = document.querySelector('.feels-like-text');
  feelsLikeText.innerText = `${Math.floor(weather.main.feels_like)}°c`;

  // Date & Time
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

  // Pressure
  const pressureText = document.querySelector('.pressure-text');
  pressureText.innerText = weather.main.pressure;

  // Temperature
  const temperatureText = document.querySelector('.temperature-text');
  temperatureText.innerText = `${Math.floor(weather.main.temp)}°c`;

  // Humidity
  const humidityText = document.querySelector('.humidity-text');
  humidityText.innerText = weather.main.humidity;

  // Low
  const lowText = document.querySelector('.low-text');
  lowText.innerText = `${Math.floor(weather.main.temp_min)}°c`;

  // High
  const highText = document.querySelector('.high-text');
  highText.innerText = `${Math.floor(weather.main.temp_max)}°c`;

  // Timezone
  const timezoneText = document.querySelector('.timezone-text');
  timezoneText.innerText = `UTC${UTC}`;

  // Wind
  const windText = document.querySelector('.wind-text');
  windText.innerText = `${Math.floor(weather.wind.speed)}km/h`;

  const windArrow = document.querySelector('.wind-arrow');
  windArrow.style.transform = `rotate(${weather.wind.deg}deg)`;

  // Cloudiness
  const cloudinessText = document.querySelector('.cloudiness-text');
  cloudinessText.innerText = `${weather.clouds.all}%`;
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

