function refreshweather(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon")
  iconElement.innerHTML  =  ` <img src=${response.data.condition.icon_url}
                              class="weather-app-icon">`;
  
  timeElement.innerHTML = formatDate(date);
   speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  getforcast(response.data.city); 

}
  function formatDate(date) {
    
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
      ];
      let day = days[date.getDay()];

      if (minutes < 10) {
      
      minutes = `0${minutes}`;
      }
         if (hours < 10) {
      
      hours= `0${hours}`;
  }


return `${day} ${hours}:${minutes}`;  

}

function searchCity(city) {
  let apiKey = "c05bc3a7aca0034e2aaf87b4fb0a01ot";
  //to search for the city
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // separation of content
  axios.get(apiUrl).then(refreshweather);
      
}




function handleSearchElement(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-form-input");
 
  //cityElement.innerHTML = searchinput.value;
  searchCity(searchinput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000) 
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
  
  
  
  
function getforcast(city) {
  let apiKey = "c05bc3a7aca0034e2aaf87b4fb0a01ot";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayforcast);

}


function displayforcast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forcastHtml = "";
  response.data.daily.forEach(function (day, index) {
      if (index < 5) {
      
          forcastHtml = forcastHtml + `
<div class="weather-forcast-day">
      <div class="weather-forcast-date">${formatDay(day.time)}</div>
      <div>
      <img src ="${day.condition.icon_url}" class="weather-forcast-icon"/>
      
      </div>
      <div class="weather-forcast-temperatures">
          <div class="weather-forcast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forcast-temperature">${Math.round(day.temperature.minimum)}°</div>
      </div>

  </div>
  
`;
      }
  });
   let forcastElement = document.querySelector("#weather-forcast");
  forcastElement.innerHTML = forcastHtml;

}


let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchElement)
searchCity("Paris");