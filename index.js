function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${days[now.getDay()]} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let cityName = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let tempIcon= response.data.condition.icon_url;

  document.querySelector("#current-city").innerHTML = cityName;
  document.querySelector(".current-temperature-value").innerHTML = temperature;
  document
    .querySelector(".current-temperature-icon")
    .setAttribute("src", tempIcon);

  document.querySelector("#weather").innerHTML = description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `<strong>${humidity}%</strong>`;
  document.querySelector("#wind").innerHTML = `<strong>${wind} km/h</strong>`;
  document.querySelector("#date").innerHTML = formatDate();

  forecastData(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;

  let apiKey = "7c5aat1b3ae474276352o70035f7ac23";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeather)
    .catch((error) => {
      alert("City not found. Please try again.");
    });
}

// Add event listener once
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Default city on load
function loadDefaultCity() {
  let defaultCity = "Paris";
  let apiKey = "7c5aat1b3ae474276352o70035f7ac23";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

loadDefaultCity();

function formatDay(timestamp){
  let date= new Date(timestamp*1000);
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[date.getDay()];
}

function forecastData(city) {
  let apiKey = "7c5aat1b3ae474276352o70035f7ac23";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response){
  
  let forecastHtml="";

  response.data.daily.forEach(function (day , index) {
    if (index<6){
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-data">
      <div class="weather-forecast-day">${formatDay(day.time)}</div>
      <div class="weather-forecast-img">
      <img src= "${day.condition.icon_url}"/>
      </div>
      <div class="weather-forecast-tempts">
        <div class="temperture-high">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div class="temperture-low">${Math.round(
          day.temperature.minimum
        )}°</div>
      </div>
    </div>`;
    }
    
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=forecastHtml;
}




