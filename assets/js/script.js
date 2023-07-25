var searchArea = $('.searchArea')
var searchHistory = $('#searchHistory')
var cityDate = $('#cityDate')
var searchButton = $('.searchButton')
var inputSearch = $('.inputSearch')
var cityName = $(inputSearch).val()

function getWeatherAPI(requestWeatherUrl) {
  fetch(requestWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('img').remove()
      // current day
      var forecastDate = data.list[0].dt_txt
      var firstDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var currentCity = data.city.name
      var currentDayForecastTemp = data.list[0].main.temp
      var currentDayForecastWind = data.list[0].wind.speed
      var currentDayForecastHumidity = data.list[0].main.humidity

      function getWeatherIcon() {
        var currentDayForecastIcon = data.list[0].weather[0].icon
        var img = $('<img>', {src:`https://openweathermap.org/img/wn/${currentDayForecastIcon}@2x.png`})
        return img
      }


      cityDate.text(currentCity + " " + firstDayDate)
      $('#currentDayIcon').append(getWeatherIcon(0))
      $('#temp1').text(`Temp:${currentDayForecastTemp}F`)
      $('#wind1').text(`Wind:${currentDayForecastWind}MPH`)
      $('#humidity1').text(`Humidity:${currentDayForecastHumidity}%`)


      // first
      forecastDate = data.list[1].dt_txt
      firstDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var firstDayForecastIcon = data.list[1].weather[0].icon
      var firstDayForecastTemp = data.list[1].main.temp
      var firstDayForecastWind = data.list[1].wind.speed
      var firstDayForecastHumidity = data.list[1].main.humidity
      $('#firstDay').text(firstDayDate)
      $('#firstDayIcon').append(getWeatherIcon(1))
      $('#temp2').text(`Temp:${firstDayForecastTemp}F`)
      $('#wind2').text(`Wind:${firstDayForecastWind}MPH`)
      $('#humidity2').text(`Humidity:${firstDayForecastHumidity}%`)


      // second 
      forecastDate = data.list[9].dt_txt
      secondDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var secondDayForecastIcon = data.list[9].weather[0].icon
      var secondDayForecastTemp = data.list[9].main.temp
      var secondDayForecastWind = data.list[9].wind.speed
      var secondDayForecastHumidity = data.list[9].main.humidity
      $('#secondDay').text(secondDayDate)
      $('#secondDayIcon').append(getWeatherIcon(9))
      $('#temp3').text(`Temp:${secondDayForecastTemp}F`)
      $('#wind3').text(`Wind:${secondDayForecastWind}MPH`)
      $('#humidity3').text(`Humidity:${secondDayForecastHumidity}%`)


      // third
      forecastDate = data.list[17].dt_txt
      thirdDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var thirdDayForecastIcon = data.list[17].weather[0].icon
      var thirdDayForecastTemp = data.list[17].main.temp
      var thirdDayForecastWind = data.list[17].wind.speed
      var thirdDayForecastHumidity = data.list[17].main.humidity
      $('#thirdDay').text(thirdDayDate)
      $('#thirdDayIcon').append(getWeatherIcon(17))
      $('#temp4').text(`Temp:${thirdDayForecastTemp}F`)
      $('#wind4').text(`Wind:${thirdDayForecastWind}MPH`)
      $('#humidity4').text(`Humidity:${thirdDayForecastHumidity}%`)


      // fourth
      forecastDate = data.list[25].dt_txt
      fourthDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var fourthDayForecastIcon = data.list[25].weather[0].icon
      var fourthDayForecastTemp = data.list[25].main.temp
      var fourthDayForecastWind = data.list[25].wind.speed
      var fourthDayForecastHumidity = data.list[25].main.humidity
      $('#fourthDay').text(fourthDayDate)
      $('#fourthDayIcon').append(getWeatherIcon(25))
      $('#temp5').text(`Temp:${fourthDayForecastTemp}F`)
      $('#wind5').text(`Wind:${fourthDayForecastWind}MPH`)
      $('#humidity5').text(`Humidity:${fourthDayForecastHumidity}%`)


      // fifth
      forecastDate = data.list[33].dt_txt
      fithDayDate = dayjs(forecastDate).format("(MM/DD/YYYY)")
      var fithDayForecastIcon = data.list[33].weather[0].icon
      var fithDayForecastTemp = data.list[33].main.temp
      var fithDayForecastWind = data.list[33].wind.speed
      var fithDayForecastHumidity = data.list[33].main.humidity
      $('#fithDay').text(fithDayDate)
      $('#fithDayIcon').append(getWeatherIcon(33))
      $('#temp6').text(`Temp:${fithDayForecastTemp}F`)
      $('#wind6').text(`Wind:${fithDayForecastWind}MPH`)
      $('#humidity6').text(`Humidity:${fithDayForecastHumidity}%`)


      var a=$('.history').text();
      var b=data.city.name;

      if (a.includes(b)){
        return

      } else {
        var button = $("<button>", {class:"history"});
        button.text(data.city.name);
        $(searchHistory).prepend(button);
          if ($("button").length>11)
        {
            favorites.find("button:last").remove();
        }
      }




    })

}




function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lon = data.city.coord.lon
      var lat = data.city.coord.lat
      console.log(lat)
      console.log(lon)
      var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3484e08d51e803d19133758ad6e77ac5&units=imperial`;
      getWeatherAPI(requestWeatherUrl)

    })

};



function userSearch() {
  cityName = $(inputSearch).val()
  localStorage.setItem('city', cityName);
}



searchButton.on('click', function (event) {
  event.preventDefault();
  userSearch();
  $('.displayArea').removeClass('hide')
  var requestGeocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3484e08d51e803d19133758ad6e77ac5`;

  getApi(requestGeocodeUrl);


})

$(searchHistory).on("click",".history", function(){
  cityName=$(this).text();
  var requestGeocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3484e08d51e803d19133758ad6e77ac5`;
  getApi(requestGeocodeUrl);

  $("#firstDayIcon img").remove();



})

// add click event listener to search button
  searchButton.on("click", function () {
    
// get search input value
    var searchInput = $("#searchInput").val().trim();
  
// call functions to get weather data
    getCurrentWeather(searchInput);
    
//getFiveDayForecast(searchInput);
    getLatAndLon (searchInput)
  });