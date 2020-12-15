
// Test functionality of JS file
document.querySelector('strong').addEventListener('click', function () {

    alert('you clicked me!');
})



// OpenWeather API Key
var apiKey = "8d184f5374e0c6605e52dd1fb2f43631";



// Saves searched city to local storage
const searchCityButton = $('#search-city');
searchCityButton.click(saveCity);
function saveCity () {
    let userCity$ = $('input').val();
    localStorage.setItem('city', userCity$);
}