var $cityField = $("#city-field");
var $getCity = $("#get-city");
var $searchHistory = $("#search-history");
var $currentWeather = $("#current-weather");
var $fiveDayForecast = $("#five-day-forecast");
var fiveDays = [];
var fiveDayTemp = [];
var fiveDayWind = [];
var fiveDayHumidity = [];
var fiveDayIcon = [];
var fiveDaysFormatted = [];

var getFiveDayForecast = function(city){
// 36.1501 -86.2833
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=67418b0882599161cc22fb3e2305cb33"
    fetch(weatherUrl)
        .then(function(response){
            console.log("got forecast response");
            return response.json();
        })
        .then(function(data){
            console.log("forecast", data);
            for (i=4; i<44; i = i+8){
                fiveDays.push(data.list[i].dt_txt);
                fiveDayTemp.push(data.list[i].main.temp);
                fiveDayWind.push(data.list[i].wind.speed);
                fiveDayHumidity.push(data.list[i].main.humidity);
                fiveDayIcon.push(data.list[i].weather[0].icon);
                // http://openweathermap.org/img/wn/01d.png
                
            }
            console.log('this is fivedays  '+ fiveDays);
            dateFormatting(fiveDays);
            
            updateFiveDayForecast(fiveDaysFormatted,fiveDayTemp,fiveDayWind,fiveDayHumidity,fiveDayIcon);
        })
}

var updateFiveDayForecast = function(fiveDaysFormatted,fiveDayTemp,fiveDayWind,fiveDayHumidity,fiveDayIcon){
    console.log("update forecast"+ fiveDayTemp);
    for (i=0; i<fiveDaysFormatted.length; i++){
        $("#day"+i).children().eq(0).html(fiveDaysFormatted[i]);
        $("#day"+i).children().eq(1).prepend(`<img src="http://openweathermap.org/img/wn/${fiveDayIcon[i]}.png"/>`);
        $("#day"+i).children().eq(2).html("Temp: "+fiveDayTemp[i]);
        $("#day"+i).children().eq(3).html("Wind Speed: "+fiveDayWind[i]);
        $("#day"+i).children().eq(4).html("Humidity: "+fiveDayHumidity[i]);
    }
}

var dateFormatting = function(fiveDays){
    // 2022-08-30 15:00:00
    console.log(fiveDays);
    fiveDaysFormatted = [];
    for (i=0; i<fiveDays.length; i++){
        var getDate = fiveDays[i].split(' ');
        var day = getDate[0].split('-');
        var formatDay = day[1]+'/'+day[2]+'/'+day[0];
        fiveDaysFormatted = fiveDaysFormatted.concat(formatDay);
        }
        console.log(fiveDaysFormatted);
        return fiveDaysFormatted
}

var getWeatherData = function(city){
    
    
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=67418b0882599161cc22fb3e2305cb33"
    fetch(weatherUrl)
        .then(function(response){
            console.log("got a response");
            return response.json();
        })
        .then(function(data){
            console.log("current weather", data);
            updateCurrentWeather(data.name, data.main.temp, data.wind.speed, data.main.humidity);


        })
}

var updateCurrentWeather = function(city,temp,wind,humidity){
    temp = ((temp - 273.15) * 9/5 + 32).toFixed(2);
    $("#city").html("City: "+city);
    $("#temp").html("Temperature: "+temp);
    $("#wind").html("Wind Speed: "+wind);
    $("#humidity").html("Humidity: "+humidity);
}



var initListeners = function(){
    console.log("initListeners");

    $getCity.submit( function(event){
        event.preventDefault();
        console.log("submitted form");
        
        var city = $cityField.val();

        getWeatherData(city);
        getFiveDayForecast(city);
        
    });
        
} 

    


$(function(){
    console.log("init");
    initListeners();

});