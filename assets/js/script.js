// search button variable
var searchButton = $("#searchButton");

// api key variable
var apiKey = "61ac768382d44f08f712b031187d1b80";
var lat;
var lon;

// Function to get current weather data
function getCurrentWeather(searchInput) {
    const urlCurrent = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
