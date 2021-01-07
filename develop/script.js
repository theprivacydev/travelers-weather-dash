// OpenWeather API Key
const openWeatherApiKey = "8d184f5374e0c6605e52dd1fb2f43631";

// Sets Date (for weather-dash) from moment.js
var currentDate = moment().format("MMM Do YYYY");

var citiesArr = [] || localStorage.getItem('TWD Cities: ').split(',');
// Creates event listener for buttons
const searchCityButton = $('#search-city');
searchCityButton.click(getWeatherInfo);
const myCities = $('#saved-cities');

// Calls opening page function which displays page for first time user or loads last city from local storage
loadOpeningPage();
dropdownMyCities();

// Converts Temp to farenheight from Kelvin
function kelvinToFarenheight (k) {
    let f = (k - 273.15) * 1.80 + 32;
    return f.toFixed(1);
  };

function getWeatherInfoFromDropdown (event) {
  console.log($(this).text());
  makeAPICalls($(this).text());
}

// Calls weather by the city name and puts info in html
function getWeatherInfo (event) {
  event.preventDefault();
    let cityName$ = $('input').val();
    console.log(cityName$)
    citiesArr.push(cityName$);
    localStorage.setItem('TWD Cities: ', citiesArr);
  
    makeAPICalls(cityName$)
    dropdownMyCities();
// End getWeatherInfo function
}

function makeAPICalls (city) {
  $('h3').hide();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + openWeatherApiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    console.log(data);
    let temp = kelvinToFarenheight(data.main.temp);
    // Display city name and info on to the page
    $('#city-name').text(data.name);
    $('#temperature').text('Temperature: ' + temp + ' \u00B0F');
    $('#humidity').text('Humidity: ' + data.main.humidity + ' %');
    $('#wind-speed').text('Wind-speed: ' + data.wind.speed + ' mph');
    $('#date').text(currentDate);
    $('#uv-index').text('UV Index: ');

    // Display weather icon to the weather dash
    var iconCode = data.weather[0].icon;
    var iconSource = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $('#icon-image').attr('src', iconSource);

    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + openWeatherApiKey;
    
    // Call to get UV Index based on latitude and longitude of city
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $('#uv-index').text('UV Index: ' + response.value);
      if (response.value < 3) {
        $('#uv-index').removeClass('moderate severe');
        $('#uv-index').addClass('favorable');
      } if (6 > response.value > 3) {
        $('#uv-index').removeClass('favorable severe');
        $('#uv-index').addClass('moderate');
      } if (response.value > 6) {
        $('#uv-index').removeClass('moderate favorable');
        $('#uv-index').addClass('severe');
      }
      // End Uv api call
      });

        // Creates 5 day forecast title
      $('.forecast-row').empty();
      let forecastTitle = $('<div>').addClass('row forecast-title');
      $('.forecast-row').append(forecastTitle);
      let title = $('<h4>').addClass('col-4').text('Five Day Forecast');
      forecastTitle.append(title);
      // Sets url variable for api call
      let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + '&lon=' + data.coord.lon + "&appid=" + openWeatherApiKey;
      // Api call
      $.ajax({
          url: forecastURL,
          method: "GET"
        }).then(function(forecastData) {
          console.log(forecastData);
          // For every day[i] ...
          for (let i=0; i < 5; i++) {
            // Creates columns with classes
            let column = $('<div>').addClass('col-sm forecast-info');
            $('.forecast-row').append(column);
            let day = $('<h5>').addClass('forecast-date');
            // Converts and displays weather icon
            let weatherIcon = $('<img>').addClass('forecast-icon');
            let iconKey = forecastData.daily[i].weather[0].icon;
            let iconSrc = "http://openweathermap.org/img/w/" + iconKey + ".png";
            weatherIcon.attr('src', iconSrc);
            // Creates display for temp and humidity
            let displayTemp = $('<p>').addClass('forecast-temp');
            let humidity = $('<p>').addClass('forecast-humidity');
            $(column).append(day, weatherIcon, displayTemp, humidity);
            // Converts api date to regular js date
            const unixDt = JSON.parse(forecastData.daily[i].dt);
            const dateJs = new Date(unixDt*1000);
            day.text(dateJs.toLocaleDateString('en-US'));
            // Sets temp and humidity text to display weather-api info
            let forecastTemp = kelvinToFarenheight(forecastData.daily[i].temp.day);
            displayTemp.text('Temp: ' + forecastTemp + ' \u00B0F');
            humidity.text('Humidity: '+ forecastData.daily[i].humidity + '%');
        // End for loop
          };
        // End forecast api call
        });
  // End first api call
  });
}





// Displays cities from client-side storage in dropdown menu
function dropdownMyCities () {
  $('.dropdown-menu').empty();
  let savedCites = localStorage.getItem('TWD Cities: ');
  let savedCitesArr = savedCites.split(',');
      for (let i=0; i< savedCitesArr.length; i++) {
        let city$ = $('<li>').addClass('dropdown-item dropright');
        $('.dropdown-menu').append(city$);
        city$.text(savedCitesArr[i]);
        console.log(savedCitesArr);
      }
      // Adds event listener for each dropdown city
      $('.dropdown-item').click(getWeatherInfoFromDropdown);
}


// Function for 1st time user entering page
function loadOpeningPage () {
   $('#opening').text('Enter a City in the search bar to get the weather!');
   let cityList = localStorage.getItem('TWD Cities: ');
   if (cityList !== null) {
    let cityListArr = cityList.split(',');
    let openingCity = cityListArr[cityListArr.length - 1];
    makeAPICalls(openingCity);
  }
}