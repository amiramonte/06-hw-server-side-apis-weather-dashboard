// GET ELEMENTS FROM THE DOM

let searchBtnEl = document.querySelector("#search-btn");

let placesSearchedEl = document.querySelector("#places-searched");


// GLOBAL VARIABLES

let weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = "f35594544b9f9597df35098b60602c39";


// FUNCTIONS

// FUNCTION TO GET CURRENT WEATHER, CREATE THE HTML ELEMENTS AND POPULATE THEM ON THE PAGE
  async function currentWeather(cityName) {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`);

      let res = await response.json();

      if (res.cod > 200) {
        return alert("Check the spelling on that city and search again!");
      }
      
      let currentZone = document.querySelector("#current-weather-zone");

      currentZone.innerHTML = " ";

      let city = res.name;
      let date = moment().format('l');
      let temp = res.main.temp;
      let humidity = res.main.humidity;
      let wind = res.wind.speed
      let icon = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`;

      let currentCardEl = document.createElement('div');
      let currentCityEl = document.createElement('h2');
      let currentIconEl = document.createElement('img');
      let currentTempEl = document.createElement('p');
      let currentWindEl = document.createElement('p');
      let currentHumidityEl = document.createElement('p');

      currentIconEl.setAttribute("src", `https://openweathermap.org/img/w/${res.weather[0].icon}.png`)

      currentCityEl.textContent = `${city} ${date}`;
      currentTempEl.textContent = `Temp: ${temp} \u00B0 F`;
      currentWindEl.textContent = `Wind: ${wind} MPH`;
      currentHumidityEl.textContent = `Humidity: ${humidity} %`;

      currentCardEl.append(currentCityEl, currentIconEl, currentTempEl, currentWindEl, currentHumidityEl);

      currentZone.append(currentCardEl);

      getUVI(res.coord.lat, res.coord.lon);
  }


// FUNCTION TO GET UV INDEX, CREATE THE HTML ELEMENT AND POPULATE IT ON THE PAGE
  async function getUVI(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f35594544b9f9597df35098b60602c39`);

    let res = await response.json();

    let currentZone = document.querySelector("#current-weather-zone");

    let UVI = res.current.uvi;

    let currentUvIndexEl = document.createElement('p') ;

    currentUvIndexEl.textContent = `UV Index: ${UVI}`;

    currentZone.append(currentUvIndexEl);
  }


// FUNCTION TO GET 5 DAY FORECAST, CREATE THE HTML ELEMENTS AND POPULATE IT ON THE PAGE
  async function getForecast(cityName) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`)
    
    let res = await response.json();

    let forecastZone = document.querySelector("#forecast-stat-zone");

    forecastZone.innerHTML = " ";

    for (let i = 4; i < 40; i+=8){
      let tempData = res.list[i];

      let cardEl = document.createElement('div');
      let dateEl = document.createElement('h5')
      let iconEl = document.createElement('img')
      let tempEl = document.createElement('p')
      let humidityEl = document.createElement('p')
      let windEl = document.createElement('p')

      dateEl.textContent = new Date (tempData.dt_txt).toLocaleDateString();
      tempEl.textContent = `Temp: ${tempData.main.temp} \u00B0 F`;
      humidityEl.textContent = `Humidity: ${tempData.main.humidity}%`;
      windEl.textContent = `Wind: ${tempData.wind.speed} MPH`;

      iconEl.setAttribute("src", `https://openweathermap.org/img/w/${tempData.weather[0].icon}.png`)
      iconEl.style.height = "50px";
      iconEl.style.width = "50px";
      cardEl.classList.add("card", "text-white", "bg-success", "col-2");
      
      cardEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);

      forecastZone.append(cardEl);
    }

  }


  // FUNCTION TO CREATE BUTTON FOR EACH PREVIOUSLY SEARCHED CITY AND HAVE IT POPULATE BELOW THE SEARCH BAR
  function runningCityList() {
    let placesSearchedZone = document.querySelector("#places-searched");
    
    let city = document.querySelector("#city-input").value;

    let placesSearchedEl = document.createElement('div');
    let cityBtnEl = document.createElement('button');

    cityBtnEl.textContent = city;

    cityBtnEl.classList.add("w-100", "btn", "btn-secondary", "my-2")

    placesSearchedEl.append(cityBtnEl);
    placesSearchedZone.append(placesSearchedEl);
  }

// FUNCTION TO RE-RUN API CALL WITH PREVIOUSLY SEARCHED CITY WHEN BUTTON WITH PREVIOUSLY SEARCHED CITY IS SELECTED 
function searchHistory(e) {
  let btn = e.target;
  let city = btn.textContent;

  currentWeather(city);
    
  getForecast(city);
}

// FUNCTION TO SAVE PREVIOUSLY SEARCHED CITY TO LOCAL STORAGE
function searchedCities(city) {
  let history = JSON.parse(localStorage.getItem("history")) || []
  
if (history.indexOf(city) !== -1) {
  return
}

  history.push(city);

  localStorage.setItem("history", JSON.stringify(history));
}



// EVENT LISTENERS

// EVENT LISTENER TO RUN FUNCTIONS WHEN THE "SEARCH" BUTTON IS SELECTED
  searchBtnEl.addEventListener("click",function() {
    let city = document.querySelector("#city-input").value;

    currentWeather(city);
    
    getForecast(city);

    searchedCities(city);

    runningCityList(city);

    let input = document.querySelector("#city-input");

    input.value = " ";

  })

// EVENT LISTENER TO RE RUN THE API CALLS WITH PREVIOUSLY SEARCHED CITIES WHEN CORRESPONDING PREVIOUSLY SEARCHED CITY BUTTON IS SELECTED
  placesSearchedEl.addEventListener("click", searchHistory);