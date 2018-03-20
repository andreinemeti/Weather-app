$(function(){
   	var date = new Date();
    var currentMonth = ["January" , "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"][(new Date()).getMonth()];
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()]
    var day = date.getDate();
    var year = new Date().getFullYear();
    $("#date").text(weekday + ", " + day + " " + currentMonth + ", " + year); 
    // var hour = date.getHours();
    
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
  }


let degree = '&#8451';   

let city = $('#searchInput');

$('#searchBtn').on('click', function(){
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
});

let celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
 
return ((fahrenheit -32) * 5/9).toFixed(0);
}


function getResponse(response) {
  $('#city').text(response.name);
  $('#temperature').html(response.main.temp.toFixed()  + ' ' + degree);
  $('.weatherIcon .icon').html('<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png'+ '"/>');
  $('#weatherIcon').text(response.weather[0].main);
  $('#wind').text(response.wind.speed + ' m/s');
  $('#humidity').text(response.main.humidity + ' %');
  $('#pressure').text(response.main.pressure + ' hpa');

  
}

$('.toggleBtn').on('click',function() {
    if (degree == '&#8451') { //if degree is celsius
    degree = '&#8457'; //change degree to fahrenheit
    $('#temperature').html(celsiusToFahrenheit(parseFloat($('#temperature').text()))  + ' ' + degree);

    }
    else if (degree == '&#8457') { //if degree is fahrenheit
        degree = '&#8451'; //change degree to celsius
        console.log(parseFloat($('#temperature').text()))
        $('#temperature').html(fahrenheitToCelsius(parseFloat($('#temperature').text()))  + ' ' + degree);
     }
  });




