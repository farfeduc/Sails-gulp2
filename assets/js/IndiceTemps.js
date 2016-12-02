// v3.1.0
//Docs at http://simpleweatherjs.com

function GetIndiceTemps()
{
  var indice = 0.0;
//  return 1.0;
	$(document).ready(function()
	{
	  $.simpleWeather({
	    location: 'Bordeaux, FR',
	    woeid: '',
	    unit: 'f',
	    success: function(weather)
	    {
	
	      //on transform weather.code en indice 
	      var arrayStorm = [0,1,2,3,4,23,37,38,39,45,47];
	      var arrayRainyH = [5,7,10,11,12,13,14,15,16,17,18,40,41,42,43,46];
	      var arrayRainy = [6,8,9,24,25,35];
	      var arrayCloudy = [19,20,21,26,27,28,29,30,44];
	      var arraySunny = [31,32,33,34,36,32000];
	      weatherCode = weather.code;
	      weatherIndice = 0.0;
	      for(var i = 0; i<arrayStorm.length; i++){
	        if (arrayStorm[i] == weatherCode){
	          weatherIndice = 0.0;
	        }
	      }
	      for(var i = 0; i<arrayRainyH.length; i++){
	        if (arrayRainyH[i] == weatherCode){
	          weatherIndice = 0.25;
	        }
	      }
	      for(var i = 0; i<arrayRainy.length; i++){
	        if (arrayRainy[i] == weatherCode){
	          weatherIndice = 0.5;
	        }
	      }
	      for(var i = 0; i<arrayCloudy.length; i++){
	        if (arrayCloudy[i] == weatherCode){
	          weatherIndice = 0.75;
	        }
	      }
	      for(var i = 0; i<arraySunny.length; i++){
	        if (arraySunny[i] == weatherCode){
	          weatherIndice = 1.0;
	        }
	      }
	      
	      wind = weather.wind.speed * 1.6;
	      windIndice = (100.0 - wind)/100.0;
	      if (weatherIndice>windIndice)
	      {
	        indice = weatherIndice;
	      }
	      else
	      {
	        indice = windIndice;
	      }
	
	      //Indice -> 0 storm    1 sunny
	      console.log("indice : " + indice);
				return indice;
	
	      
	    },
	    error: function(error) {
	      $("#weather").html('<p>'+error+'</p>');
	    }
	  });
	});
	
				return indice;
	return 0.0; // au cas ou
}