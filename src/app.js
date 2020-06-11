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
  // To delete after testing
  console.log(weather);

  const UTC = timezoneToUTC(weather.timezone);
  
  // Sunrise Time
  const sunriseDate = new Date(weather.sys.sunrise * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunriseDateArray = sunriseDate.split(/(\s+)/);
  const sunriseTime = sunriseDateArray[2].substring(0, sunriseDateArray[2].length - 3);
  const sunrisePeriod = sunriseDateArray[4].toUpperCase();
  const formattedSunriseTime = `${sunriseTime}${sunrisePeriod}`;
  const sunriseText = document.querySelector('.sunrise-time');
  sunriseText.innerText = formattedSunriseTime;

  // Sunset Time
  const sunsetDate = new Date(weather.sys.sunset * 1000).toLocaleString('en-AU', { timeZone: IANATimezoneBuilder(UTC) });
  const sunsetDateArray = sunsetDate.split(/(\s+)/);
  const sunsetTime = sunsetDateArray[2].substring(0, sunsetDateArray[2].length - 3);
  const sunsetPeriod = sunsetDateArray[4].toUpperCase();
  const formattedSunsetTime = `${sunsetTime}${sunsetPeriod}`;
  const sunsetText = document.querySelector('.sunset-time');
  sunsetText.innerText = formattedSunsetTime;

  // Icon
  const iconImage = document.querySelector('.weather-icon-image');
  iconImage.src = `./icons/${weather.weather[0].icon}@4x.png`;

  // Weather Description
  const weatherDescriptionFromApi = weather.weather[0].description;
  const weatherDescriptionHtml = weatherDescriptionFromApi.replace(/\s/g, '<br>').toUpperCase();
  const weatherDescriptionText = document.querySelector('.weather-description');
  weatherDescriptionText.innerHTML = `<h2 class="weather-description-text">${weatherDescriptionHtml}</h2>`;

  // Coordinates
  const latitude = weather.coord.lat;
  const longitude = weather.coord.lon;
  const latitudeText = document.querySelector('.latitude-body');
  latitudeText.innerText = latitude;
  const longitudeText = document.querySelector('.longitude-body');
  longitudeText.innerText = longitude;

  // City name
  const cityText = document.querySelector('.city-text');
  cityText.innerText = `${weather.name}, ${weather.sys.country}`;

  // Visibility
  const visibilityText = document.querySelector('.visibility-body');
  if ('visibility' in weather) {
    const visibilityNumber = weather.visibility.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    visibilityText.innerText = `${visibilityNumber} m`;
  } else {
    visibilityText.innerText = 'No data';
  }

  // Feels Like
  const feelsLikeText = document.querySelector('.feels-like-body');
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
  dateTimeText.innerHTML = `${day},<br>${date} ${month} ${year}<br>${time}${period}`;

  //
  //
  /*
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  */
}

function timezoneToUTC(timezone) {
  return timezone / 3600;
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
/*
function dateBuilder (d) {

}

*/
