
// OpenWeather API Key
const openWeatherApiKey = "8d184f5374e0c6605e52dd1fb2f43631";
const uvApiKey = "&key=d3f777192d194d2fa2c8955860268325";

// Sets Date
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
    JSON.stringify(localStorage.setItem('TWD Cities: ', citiesArr));
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


        $('.forecast').addClass('weather-info');

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
        dropdownMyCities();
      });
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
  let savedCites = JSON.parse(localStorage.getItem('TWD Cities: '));
  console.log(savedCites);
      for (let i = 0; i < savedCites.length; i++) {
        let city$ = $('<li>').addClass('dropdown-item dropright');
        $('.dropdown-menu').append(city$);
        city$.text(savedCites[i]);
        console.log(savedCites[i]);
      }
}

function loadOpeningPage () {
  // if (localStorage.key === 'TWD Cities: ') {
  //   getWeatherInfo();
  // } 
   $('#opening').text('Enter a City in the search bar to get the weather!');
}


// function getForecast () {
//     $('.forecast').addClass('weather-info');
//     let city = "&city=Portland";
//     let queryURL = "https://api.weatherbit.io/v2.0/history/daily?" + city + "&start_date=2020-12-16&end_date=2020-12-17" + uvApiKey;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(data) {
//         console.log(data);
//         $('#uv-index').text('UV Index: ', );

//       });
// }