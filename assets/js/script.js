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

      let img = document.createElement('img');
      img.src = icon;


      getUVI(res.coord.lat, res.coord.lon);

      searchedCityEl.innerHTML = city + " " + "(" + moment().format('l') + ")" + " ";
      searchedCityEl.appendChild(img);
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
    console.log(city);
    currentWeather(city);
    getForecast(city);
  })