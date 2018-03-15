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
