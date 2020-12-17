
// OpenWeather API Key
const apiKey = "8d184f5374e0c6605e52dd1fb2f43631";

// Sets Date
var currentDate = moment().format("MMM Do YYYY");

loadDashTemplate();

// Creates event listener for buttons
const searchCityButton = $('#search-city');
searchCityButton.click(saveCity);
const myCities = $('#saved-cities');
myCities.click(sidebarSavedCities);

// Saves searched city to client-side storage
function saveCity (event) {
    event.preventDefault();

    getWeatherInfo();

    let userCity$ = $('input').val();
    localStorage.setItem('city', userCity$);
}


// Calls weather by the city name and puts info in html
function getWeatherInfo () {
    let cityName$ = $('input').val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName$ + "&appid=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
        console.log(data);
        // Display city name and info on to the page
        $('#city-name').text(data.name);
        $('#date').text(currentDate);
        $('#temperature').text('Temperature: ' + data.main.temp)
        $('#humidity').text('Humidity: ' + data.main.humidity)
        $('#wind-speed').text('Wind-speed: ' + data.wind.speed)
        $('#uv-index').text('UV Index: ')

        // Display weather icon to the page
        var iconCode = data.weather[0].icon;
        var iconSource = "http://openweathermap.org/img/w/" + iconCode + ".png"
        $('#icon-image').attr('src', iconSource);



      });
}

function sidebarSavedCities () {
    // Unhide sidebar
    let savedCities = $('.sidebar').show();

    // Displays cities in sidebar
    let city = savedCities.text(localStorage.getItem('city'));

    city.click(getWeatherInfo(city));
    
}

function loadDashTemplate () {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Portland" + "&appid=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
        console.log(data);
        $('#city-name').text(data.name);
        $('#date').text(currentDate);
        $('#temperature').text('Temperature: ' + data.main.temp)
        $('#humidity').text('Humidity: ' + data.main.humidity)
        $('#wind-speed').text('Wind-speed: ' + data.wind.speed)
        $('#uv-index').text('UV Index: ')

        // Loading weather icons
        var iconCode = data.weather[0].icon;
        var iconSource = "http://openweathermap.org/img/w/" + iconCode + ".png"
        $('#icon-image').attr('src', iconSource);
      });
}





    //   api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


    //   api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}