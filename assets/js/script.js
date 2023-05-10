// search button variable
var searchButton = $("#searchButton");

// api key variable
var apiKey = "61ac768382d44f08f712b031187d1b80";
var lat;
var lon;

// Function to get current weather data
function getCurrentWeather(searchInput) {
    const urlCurrent = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

    $.ajax({
        url: urlCurrent,
        method: "GET",
      }).then(function (response) {

// Add city name to the list
        const cityName = $("<li>").text(response.name).addClass("list-group-item");
        $(".list-group").append(cityName);
    
// Save city name to local storage
    localStorage.setItem(localStorage.length, response.name);
    lat= response.coord.lat;
    lon= response.coord.lon;
    
// Format date
    const timeUTC = new Date(response.dt * 1000);
    const date = timeUTC.toLocaleDateString("en-US");

// Create current weather card
    const currentBody = $("<div>").addClass("card-body");
    $(".current-card").append(currentBody);
    const currentName = $("<p>").text(`${response.name} ${date}`);
    currentBody.append(currentName);

// Add weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
    const icon = $("<img>").attr("src", iconUrl);
    currentBody.append(icon);

// Add temperature
    const temp = $("<p>").text(`Temperature: ${response.main.temp}°F`);
    currentBody.append(temp);

// Add humidity
    const humidity = $("<p>").text(`Humidity: ${response.main.humidity}%`);
    currentBody.append(humidity);

// Add wind speed
    const windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed}`);
    currentBody.append(windSpeed);