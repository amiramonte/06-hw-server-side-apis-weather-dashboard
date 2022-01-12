// GET ELEMENTS FROM THE DOM
let searchBtnEl = document.querySelector("#search-btn");






// VARIABLES

let weatherRequestUrl = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = "f35594544b9f9597df35098b60602c39";
let city;




  async function currentWeather(cityName) {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f35594544b9f9597df35098b60602c39&units=imperial`);

      let res = await response.json();

      let temp = res.main.temp;
      let humidity = res.main.humidity;
      let wind = res.wind.speed
      let icon = `https://openweathermap.org/img/w/${res.weather[0].icon}.png`;

      getUVI(res.coord.lat, res.coord.lon);
  }

  currentWeather(`denver`);


  async function getUVI(lat, lon) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f35594544b9f9597df35098b60602c39`);

    let res = await response.json();

    let UVI = res.current.uvi;
  }




// Event Listeners

  searchBtnEl.addEventListener("click",function (params) {
    console.log("Hello World");
  })