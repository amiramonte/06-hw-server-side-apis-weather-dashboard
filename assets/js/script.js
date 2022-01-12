// GET ELEMENTS FROM THE DOM
let searchBtnEl = document.querySelector("#search-btn");
let searchedCityEl = document.querySelector("#searched-city");
let currentTempEl = document.querySelector("#current-temp");
let currentWindEl = document.querySelector("#current-wind");
let currentHumidityEl = document.querySelector("#current-humidity");
let currentUvEl = document.querySelector("#current-uv");
let currentDateEl = document.querySelector("#current-date");



// VARIABLES

let weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = "f35594544b9f9597df35098b60602c39";




  async function currentWeather(cityName) {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`);

      let res = await response.json();

      let city = res.name;
      let temp = res.main.temp;
      let humidity = res.main.humidity;
      let wind = res.wind.speed
      let icon = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`;


      getUVI(res.coord.lat, res.coord.lon);

      searchedCityEl.innerHTML = city + " " + moment().format('l') + " ";
      currentTempEl.textContent = "Temp: " + temp + "\u00B0" + "F";
      currentWindEl.textContent = "Wind: " + wind + " MPH";
      currentHumidityEl.textContent = "Humidity: " + humidity + "%";


  }



  async function getUVI(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f35594544b9f9597df35098b60602c39`);

    let res = await response.json();

    let UVI = res.current.uvi;

    currentUvEl.textContent = "UV Index: " + UVI;

  }




// Event Listeners

  searchBtnEl.addEventListener("click",function() {
    currentWeather(document.querySelector("#city-input").value);
  })