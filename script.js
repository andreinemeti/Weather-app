$(function(){
   	let date = new Date();
    let currentMonth = ["January" , "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"][(new Date()).getMonth()];
    let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()]
    let day = date.getDate();
    let year = new Date().getFullYear();
    $("#date").text(weekday + ", " + day + " " + currentMonth + ", " + year); 
    // var hour = date.getHours();
    
});

$(function(){
    $('body').css({'background-image' : weatherPics[5]})
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude;
      $.ajax ({  
        url: 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon=' + longitude + '&units=metric&APPID=a550e6d882e111463620f5ce6b2666a5',
        type: 'POST',
        dataType: 'json',
        success(response) {
          getResponse(response)
        },
        error(jqXHR, status, errorThrown) {
            $('h2').text('City not found...');
        }
      });
    });
  };

const getWeatherByCity = () => {
  $.ajax ({  
  url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city.val() + '&units=metric&APPID=a550e6d882e111463620f5ce6b2666a5',
  type: 'POST',
  dataType: 'json',
  success(response) {
    getResponse(response)
  },
  error(jqXHR, status, errorThrown) {
    $('h2').text('City not found...');
  }
});
}

let degree = '&#8451';   
let city = $('#searchInput');

city.bind("keypress", {}, keypressInBox);

function keypressInBox(e) {
  let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
        e.preventDefault();
      }
 }

const delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

city.keyup(function() {
    delay(function(){
     getWeatherByCity();
    }, 1000 );
});

$('#searchBtn').on('click', function(){
 getWeatherByCity();
});

const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5 + 32);
}

const fahrenheitToCelsius = (fahrenheit) => {
return ((fahrenheit -32) * 5/9).toFixed(0);
}



const weatherPics = ['url("img/clear.jpg', 'url("img/clouds.jpg', 'url("img/rain.jpg', 'url("img/snow.jpg', 
'url("img/thunderstorm.jpg', 'url("img/default.jpg'];


function getResponse(response) {
  $('#city').text(response.name);
  $('#temperature').html(response.main.temp.toFixed()  + ' ' + degree);
  $('.weatherIcon .icon').html('<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png'+ '"/>');
  $('#weatherIcon').text(response.weather[0].main);
  $('#wind').text(response.wind.speed + ' m/s');
  $('#humidity').text(response.main.humidity + ' %');
  $('#pressure').text(response.main.pressure + ' hpa');


//changing the background to match the weather
  $("#weatherIcon").filter(function() {
    switch ($(this).text()) {

      case 'Clear':
      $('body').css({background: weatherPics[0]});
      break;

      case 'Clouds':
      $('body').css({'background-image' : weatherPics[1],
      'background-repeat': 'no-repeat',
      'background-size': 'cover'});
      break;

      case 'Rain':
      $('body').css({'background-image' : weatherPics[2],
      'background-repeat': 'no-repeat',
      'background-size': 'cover'});

      case 'Snow':
      $('body').css({'background-image' : weatherPics[3],
      'background-repeat': 'no-repeat',
      'background-size': 'cover'});
      break;

      case 'Thunderstorm':
      $('body').css({'background-image' : weatherPics[4],
      'background-repeat': 'no-repeat',
      'background-size': 'cover'});
      break;

      default:
      $('body').css({'background-image' : weatherPics[5],
      'background-repeat': 'no-repeat',
      'background-size': 'cover'});
      break;

    }
  });
}

$('.temperature').on('click',function() {
    if (degree == '&#8451') { //if degree is celsius
    degree = '&#8457'; //change degree to fahrenheit
    $('.temperatureIcon span').html('&#8457');
    $('#temperature').html(celsiusToFahrenheit(parseFloat($('#temperature').text()))  + ' ' + degree);

    }
    else if (degree == '&#8457') { //if degree is fahrenheit
        degree = '&#8451'; //change degree to celsius
        $('.temperatureIcon span').html('&#8451');
        console.log(parseFloat($('#temperature').text()))
        $('#temperature').html(fahrenheitToCelsius(parseFloat($('#temperature').text()))  + ' ' + degree);
     }
  });











