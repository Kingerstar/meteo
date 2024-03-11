
document.addEventListener('DOMContentLoaded', function () {
  const cityInput = document.getElementById('city-input');
  const searchButton = document.getElementById('search-bar');
  const weatherCard = document.querySelector('.weather-card');
  const headerHover = document.querySelector('.before-api') ;

searchButton.addEventListener('click',function(){
  weatherCard.classList.add('hovered') ;
  headerHover.classList.remove('before-api')

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
    console.log(weatherData) ;
    document.getElementById("descr").textContent = weatherData.weather[0].main.charAt(0).toUpperCase() + weatherData.weather[0].main.slice(1);  ;
    document.getElementById("temperature").textContent =  weatherData.main.temp + " °C" ;
    document.getElementById("country").textContent = weatherData.sys.country ;
    document.getElementById("temp-max").textContent = "Today max's temperature: " + weatherData.main.temp_max + " °C" ;
    document.getElementById("temp-min").textContent=  "Today min's temperature: " + weatherData.main.temp_min + " °C";
    document.getElementById("humidity").textContent = "Humidity: " + weatherData.main.humidity + " %";
    document.getElementById("wind-speed").textContent = "Wind Speed: " + weatherData.wind.speed + "km/h" ;
    
    const flag = weatherData.sys.country ;
    const flagContainer = document.getElementById("flag-container");
    flagContainer.className = "";
    flagContainer.classList.add("flag-icon", `flag-icon-${flag.toLowerCase()}`)

    
    function selectAudio(weather){
    switch(weatherAudio.toLowerCase()) {
      case "rain":  return "assets/rain.mp3";
      case "clear": return "assets/clear.mp3";
      case "clouds": return "assets/clouds.mp3";
      case "mist": return "assets/mist.mp3";
      case "snow": return "assets/snow.mp3"
    }
    }

    const weatherAudio = weatherData.weather[0].main.toLowerCase() ;
    const audioElement = document.getElementById("weather-audio");
    const audioSource = selectAudio(weatherAudio) ;
    audioElement.removeAttribute('controls') ;
    audioElement.src = audioSource ;
    
    const accessKey = '-WFVVUIMTTlYcPJAe_fMf8OHQlIxuIdvEWmCQnloVAk'; 
    const query = `${cityName}`;
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
  ""
  return response.json();
})
.then(data => {
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
