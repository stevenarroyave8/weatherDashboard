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

// Get UV index data
     const urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${response.coord.lat}&lon=${response.coord.lon}`;

     $.ajax({
       url: urlUV,
       method: "GET",
     }).then(function (response) {

    const uvIndex = $("<p>").text(`UV Index: ${response.value}`).addClass("card-text UV");
    currentName.append(uvIndex);
 
// Add current weather card to the page
       currentCard.append(currentName);
       $(".currentCard").empty().append(currentCard);
     });
   });
 }
 function getLatAndLon (searchInput) {
   const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&Appid=${apiKey}&units=imperial`;
 
   $.ajax({
     url: urlCurrent,
     method: "GET",
   }).then(function (response) {
     lat= response.coord.lat;
     lon= response.coord.lon;
     getFiveDayForecast (lat,lon)
   })
 }
 
// Function to get 5-day forecast data
 function getFiveDayForecast(lat,lon) {
   const urlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
 console.log (urlFiveDay)
   $.ajax({
     url: urlFiveDay,
     method: "GET",
   }).then(function (response) {
     const day = [0, 8, 16, 24, 32];
     const fiveDayDiv = $(".five-day-one").addClass("card-text");
     fiveDayDiv.empty();