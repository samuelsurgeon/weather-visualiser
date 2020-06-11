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
  console.log(weather);
  const UTC = timezoneToUTC(weather.timezone);
  
  let sunriseDate = new Date(weather.sys.sunrise * 1000);
  let sunriseHours = sunriseDate.getHours();
  let sunriseMinutes = '0' + sunriseDate.getMinutes();
  let formattedSunrise = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;

  let sunriseTime = document.querySelector('.sunrise-time');
  sunriseTime.innerText = formattedSunrise;
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
    -11: 'Pacific/Niue', 
    -10: 'Pacific/Honolulu', 
    -9: 'America/Anchorage',
    -8: 'America/Los_Angeles',
    -7: 'America/Phoenix',
    -6: 'America/Mexico_City',
    -5: '
}
/*
function dateBuilder (d) {
  let months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

*/
