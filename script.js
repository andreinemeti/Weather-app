$(function(){
   	var date = new Date();
    var currentMonth = ["January" , "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"][(new Date()).getMonth()];
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()]
    var day = date.getDate();
    var year = new Date().getFullYear();
    $("#date").text(weekday + ", " + day + " " + currentMonth + ", " + year); 

});

// sky icons
  var skycons = new Skycons({"color": "#ddd713"});
 
  skycons.play();

  skycons.set("icon2", Skycons.CLEAR_DAY);


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      latitude = position.coords.latitude
      longitude = position.coords.longitude;
      $.ajax ({  
        url: 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon=' + longitude + '&units=metric&APPID=a550e6d882e111463620f5ce6b2666a5',
        type: 'POST',
        dataType: 'json',
        success(response) {
            $('#city').text(response.name);
            $('#temperature').html(response.main.temp.toFixed()  + ' ' + degree);
            $('#weatherIcon').text(response.weather[0].main);
            $('#wind').text(response.wind.speed + ' m/s');
            $('#humidity').text(response.main.humidity + ' %');
            $('#pressure').text(response.main.pressure + ' hpa');
        },
        error(jqXHR, status, errorThrown) {
            $('h2').text('City not found...');
        }
      });
    });
  }




let degree = '&#8451';   
//&#8457 farehnheit
let city = $('#searchInput');

$('#searchBtn').on('click', function(){
  $.ajax ({  
  url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city.val() + '&units=metric&APPID=a550e6d882e111463620f5ce6b2666a5',
  type: 'POST',
  dataType: 'json',
  success(response) {

  $('#city').text(response.name);
  $('#temperature').html(response.main.temp.toFixed()  + ' ' + degree);
  $('#weatherIcon').text(response.weather[0].main);
  $('#wind').text(response.wind.speed + ' m/s');
  $('#humidity').text(response.main.humidity + ' %');
  $('#pressure').text(response.main.pressure + ' hpa');

  },
  error(jqXHR, status, errorThrown) {
    $('h2').text('City not found...');
  }
});
});

let fahrenheitToCelsius = (fahrenheit) => {
  console.log((fahrenheit - 32) * (5/9));
  return ((fahrenheit - 32) * (5/9));
}

fahrenheitToCelsius(276);



