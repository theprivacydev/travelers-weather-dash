
// Test functionality of JS file
document.querySelector('strong').addEventListener('click', function () {

    alert('you clicked me!');
})



// OpenWeather API Key
var apiKey = "8d184f5374e0c6605e52dd1fb2f43631";



// Saves searched city to local storage
const searchCityButton = document.getElementById('search-city');
searchCityButton.addEventListener('click', saveCity);
function saveCity () {
    let userCity = document.querySelector('input').value;
    localStorage.setItem('city', userCity);
}