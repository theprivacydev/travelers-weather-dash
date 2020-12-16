
// OpenWeather API Key
var apiKey = "8d184f5374e0c6605e52dd1fb2f43631";



// Creates event listener for "Go" button
const searchCityButton = $('#search-city');
searchCityButton.click(saveCity);

// Saves searched city to local storage
function saveCity () {
    let userCity$ = $('input').val();
    localStorage.setItem('city', userCity$);
}


