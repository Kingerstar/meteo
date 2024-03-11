
document.addEventListener('DOMContentLoaded', function () {
  const cityInput = document.getElementById('cityInput');
  const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',function(){

const cityName = cityInput.value ;
if(cityName !== "") {
const apiKey= "13d52f84b2513edfbaddc7217b4909c4" ;
const apiCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

fetch(apiCoordinates)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error with api request');
    }
    return response.json();
  })
  .then(data => {
    let lattitude = data[0].lat ;
    let longitude = data[0].lon ;
    let apiHistory = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    return fetch(apiHistory);
  })    
  .then(response => {
    if(!response.ok){
      throw new Error("Error with api Request")
    }
    return response.json();
  })
  .then(weatherData => {
    document.getElementById("descr").textContent = weatherData.weather[0].description ;
    document.getElementById("temperature").textContent =  weatherData.main.temp + " °C" ;
    document.getElementById("country").textContent = weatherData.sys.country ;
    document.getElementById("temp-max").textContent = "Today max's temperature" + weatherData.main.temp_max + " °C" ;
    document.getElementById("temp-min").textContent=  "Today min's temperature" + weatherData.main.temp_min + " °C";
    document.getElementById("humidity").textContent = "Humidity: " + weatherData.main.humidity ;
    document.getElementById("wind-speed").textContent = "Wind Speed: " + weatherData.wind.speed + "kmh" ;
  })

  .catch(error => {
    console.error('An error as occured', error);
  });




const localizationInput = document.getElementById("localization") ; 
const temperatureInput = document.getElementById("temperature") ;
}
})
}) ;