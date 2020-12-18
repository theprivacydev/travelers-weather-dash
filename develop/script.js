
// OpenWeather API Key
const apiKey = "8d184f5374e0c6605e52dd1fb2f43631";

// Sets Date
var currentDate = moment().format("MMM Do YYYY");

loadOpeningPage();

// Creates event listener for buttons
const searchCityButton = $('#search-city');
searchCityButton.click(getWeatherInfo);
const myCities = $('#saved-cities');
myCities.click(dropdownMyCities);

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
    localStorage.setItem('city', cityName$);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName$ + "&appid=" + apiKey;
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

        // Display weather icon to the page
        var iconCode = data.weather[0].icon;
        var iconSource = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $('#icon-image').attr('src', iconSource);

      });
}

// Displays cities from client-side storage in sidebar
function dropdownMyCities () {

    // Displays cities in sidebar
    let city = savedCities.text(localStorage.getItem('city'));

    city.click(getWeatherInfo);
    
}

function loadOpeningPage () {
  if (localStorage.key === 'city') {
    getWeatherInfo()
  }
   $('#opening').text('Enter a City in the search bar to get the weather!')
   
}

function getForecast () {
    $('.forecast').addClass('weather-info');
    let city = "Portland";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response.list[0].dt_txt);

      });
}

// getForecast();