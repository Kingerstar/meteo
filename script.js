
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
    document.getElementById("descr").textContent = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);  ;
    document.getElementById("temperature").textContent =  weatherData.main.temp + " °C" ;
    document.getElementById("country").textContent = weatherData.sys.country ;
    document.getElementById("temp-max").textContent = "Today max's temperature: " + weatherData.main.temp_max + " °C" ;
    document.getElementById("temp-min").textContent=  "Today min's temperature: " + weatherData.main.temp_min + " °C";
    document.getElementById("humidity").textContent = "Humidity: " + weatherData.main.humidity ;
    document.getElementById("wind-speed").textContent = "Wind Speed: " + weatherData.wind.speed + "km/h" ;
    const accessKey = '-WFVVUIMTTlYcPJAe_fMf8OHQlIxuIdvEWmCQnloVAk'; 
    const query = `${cityName}+ impressionism`;


const apiImage = `https://api.unsplash.com/search/photos?query=${query}&w=1920&h=1080`;


fetch(apiImage, {
  headers: {
    Authorization: `Client-ID ${accessKey}`,
    'Accept-Version': 'v1',
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data.results)
  const random = Math.floor(Math.random() * 10) ;
  const img = data.results[random].urls.regular;
  const myImage = document.getElementById("img");
  myImage.style.backgroundImage = `url(${img})`;
  
})
  })

  .catch(error => {
    console.error('An error as occured', error);
  });

}
})
}) ;