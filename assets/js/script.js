// GET ELEMENTS FROM THE DOM
let searchBtnEl = document.querySelector("#search-btn");




// VARIABLES

let weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = "f35594544b9f9597df35098b60602c39";




  async function currentWeather(cityName) {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`);

      let res = await response.json();

      let currentZone = document.querySelector("#current-weather-zone");

      let city = res.name;
      let temp = res.main.temp;
      let humidity = res.main.humidity;
      let wind = res.wind.speed
      let icon = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`;

      let currentCardEl = document.createElement('div');
      let currentCityEl = document.createElement('h2');
      let currentTempEl = document.createElement('p');
      let currentWindEl = document.createElement('p');
      let currentHumidityEl = document.createElement('p');
      let currentUvIndexEl = document.createElement('p');
      let currentIconEl = document.createElement('img');

      currentCityEl.textContent = city;
      currentTempEl.textContent = temp;
      currentWindEl.textContent = wind;
      currentHumidityEl.textContent = humidity;

      currentCardEl.append(currentCityEl, currentTempEl, currentWindEl, currentHumidityEl);

      currentZone.append(currentCardEl);

      getUVI(res.coord.lat, res.coord.lon);

      




  }



  async function getUVI(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f35594544b9f9597df35098b60602c39`);

    let res = await response.json();

    let UVI = res.current.uvi;


  }



  async function getForecast(cityName) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`)
    
    let res = await response.json();
    
    let forecastZone = document.querySelector("#forecast-stat-zone");

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
      humidityEl.textContent = `Humidity: ${tempData.main.humidity}`;
      windEl.textContent = `Wind: ${tempData.wind.speed} MPH`;

      iconEl.setAttribute("src", `https://openweathermap.org/img/w/${tempData.weather[0].icon}.png`)
      iconEl.style.height = "50px";
      iconEl.style.width = "50px";
      cardEl.classList.add("card", "text-white", "bg-success", "col-2");
      
      cardEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);

      forecastZone.append(cardEl);




    }


  }













// Event Listeners

  searchBtnEl.addEventListener("click",function() {
    let city = document.querySelector("#city-input").value;
    currentWeather(city);
    
    getForecast(city);
  })