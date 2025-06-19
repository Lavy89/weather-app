function cityDisplay(event) {
  event.preventDefault();
  let city = document.querySelector(".search-input");
  let othercity = document.querySelector(".current-city");
  othercity.innerHTML = city.value;
}
let form = document.querySelector("form");
form.addEventListener("submit", cityDisplay);
let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let date = document.querySelector(".date");
date.innerHTML = `${now.getHours()}:${now.getMinutes()},${Days[now.getDay()]}`;
