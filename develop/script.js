// Calls opening page function which displays page for first time user or loads last city from local storage
loadOpeningPage();


// OpenWeather API Key
const openWeatherApiKey = "8d184f5374e0c6605e52dd1fb2f43631";
const uvApiKey = "&key=d3f777192d194d2fa2c8955860268325";

// Sets Date (for weather-dash) from moment.js
var currentDate = moment().format("MMM Do YYYY");

var citiesArr = [];
// Creates event listener for buttons
const searchCityButton = $('#search-city');
searchCityButton.click(getWeatherInfo);
const myCities = $('#saved-cities');

// Converts Temp to farenheight from Kelvin
function kelvinToFarenheight (k) {
    let f = (k - 273.15) * 1.80 + 32;
    return f.toFixed(1);
  };

// Calls weather by the city name and puts info in html
function getWeatherInfo (event) {
  event.preventDefault();
    $('h3').hide();
    let cityName$ = $('input').val();
    citiesArr.push(cityName$);
    localStorage.setItem('TWD Cities: ', citiesArr);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName$ + "&appid=" + openWeatherApiKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
        console.log(data);
        let temp = kelvinToFarenheight(data.main.temp);
        // Display city name and info on to the page
        $('#city-name').text(data.name);
        $('#date').text(currentDate);
        $('#temperature').text('Temperature: ' + temp + ' \u00B0F');
        $('#humidity').text('Humidity: ' + data.main.humidity + ' %');
        $('#wind-speed').text('Wind-speed: ' + data.wind.speed + ' mph');
        $('#uv-index').text('UV Index: ');

        // let uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + data.lat + "&lon=" + data.lon + "&appid=" + openWeatherApiKey;
  
        // $.ajax({
        //   url: uvURL,
        //   method: "GET"
        // }).then(function(response) {
        //   console.log(response);
          // $('#uv-index').text('UV Index: ');
          // });

        // Display weather icon to the page
        var iconCode = data.weather[0].icon;
        var iconSource = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $('#icon-image').attr('src', iconSource);

      });
      getForecast();
      dropdownMyCities();
}


// function getUvIndex () {
//   let uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"
  
//   $.ajax({
//     url: uvURL,
//     method: "GET"
//   }).then(function(data) {


//     $('#uv-index').text('UV Index: ');
//     });

// }

// Displays cities from client-side storage in dropdown menu
function dropdownMyCities () {
  $('.dropdown-menu').empty();
  let savedCites = localStorage.getItem('TWD Cities: ');
  let savedCitesArr = savedCites.split(',');
      for (let i=0; i< savedCitesArr.length; i++) {
        console.log(savedCitesArr[i]);
        let city$ = $('<li>').addClass('dropdown-item dropright');
        $('.dropdown-menu').append(city$);
        city$.text(savedCitesArr[i]);

      }
}

// Function for 1st time user entering page
function loadOpeningPage () {
  // if (localStorage.key === 'TWD Cities: ') {
  //   getWeatherInfo();
  // } 
   $('#opening').text('Enter a City in the search bar to get the weather!');
}

// Function to get 5-day forecast
function getForecast () {
    $('.forecast-row').empty();
    // Creates 5 day forecast title
    let forecastTitle = $('<div>').addClass('row');
    $('.forecast-row').append(forecastTitle);
    let title = $('<h4>').addClass('col-4 forecast-title').text('Five Day Forecast');
    forecastTitle.append(title);
    // Sets variables for api call
    let city = $('input').val();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + openWeatherApiKey;
    // Api call
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
        console.log(data);
        // For every day[i] ...
        for (let i=0; i < 5; i++) {
          // Creates columns with classes
          let column = $('<div>').addClass('col-sm forecast-info');
          $('.forecast-row').append(column);
          let day = $('<h5>').addClass('forecast-date');
          // Converts and displays weather icon
          let weatherIcon = $('<img>').addClass('forecast-icon');
          let iconKey = data.list[i].weather[0].icon;
          let iconSrc = "http://openweathermap.org/img/w/" + iconKey + ".png";
          weatherIcon.attr('src', iconSrc);
          // Creates display for temp and humidity
          let displayTemp = $('<p>').addClass('forecast-temp');
          let humidity = $('<p>').addClass('forecast-humidity');
          $(column).append(day, weatherIcon, displayTemp, humidity);
          // Converts api date to regular js date
          const unixDt = JSON.parse(data.list[i].dt);
          const dateJs = new Date(unixDt*1000);
          console.log(dateJs);
          day.text(dateJs.toLocaleDateString('en-US'));
          // Sets temp and humidity text to display weather-api info
          let temp = kelvinToFarenheight(data.list[i].main.temp);
          displayTemp.text('Humidity: ' + temp + '%');
          humidity.text('Temp: ' + data.list[i].main.humidity + ' \u00B0F');
        };

      });
}