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
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = document.querySelector(".date");

date.innerHTML = `${day} ${hour}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${location}`;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${temperature}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "7df4cedb86cc8633158337122115a5f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKeyT = "26d3f970bdc8ef4b82b8b13455da9e1a";
  let apiUrlT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyT}&units=${units}`;
  axios.get(`${apiUrlT}`).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector("#current-location-button");
button.addEventListener("Click", showPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
