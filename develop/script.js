
// OpenWeather API Key
const apiKey = "8d184f5374e0c6605e52dd1fb2f43631";


// Creates event listener for "Go" button
const searchCityButton = $('#search-city');
searchCityButton.click(saveCity);

// Saves searched city to client-side storage
function saveCity (event) {
    event.preventDefault();

    getWeatherInfo();

    let userCity$ = $('input').val();
    localStorage.setItem('city', userCity$);

    sidebarSavedCities();
}


// Calls weather by the city name and puts info in html
function getWeatherInfo () {
    let cityName$ = $('input').val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName$ + "&appid=" + apiKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $('#city-name-date').text(response.name);
      });
}

function sidebarSavedCities () {


}

    //   api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


    //   api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}