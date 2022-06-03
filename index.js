const inputText = document.querySelector("input")
// const content = document.getElementById('content')
const form = document.querySelector("form")
const location = document.getElementsByClassName("location")
const apiKey = "6dda46b7b0578a12825d47e372232005"
// 0K − 273.15 = -273.1°C
// C = K - 273.15
// img url http://openweathermap.org/img/wn/${icon code}@2x.png

async function getGeoLocation(place) {
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${apiKey}`
  fetch(url)
    .then(res => res.json())
    .then(json => {
      getWeather(json[0].lat, json[0].lon)
    })
}
async function getWeather(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  fetch(url)
    .then(res => res.json())
    .then(json => displayWeather(json))
}
async function displayWeather(forcast) {
  let weather = forcast["weather"]
  let weatherIcon = weather[0]["icon"]
  let weatherDescription = forcast["weather"][0]["description"]
  let tempInCelsuis = forcast["main"]["temp"]
  const numberForKelvinConversion = 273.15
  // convert kelvin to celsius
  let celsius = tempInCelsuis - numberForKelvinConversion
  $("#content").append(`
  <h2>${celsius.toFixed()} °C</h2>
  <p>${weatherDescription}</p>
<img src=${`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt=${weatherDescription}/>
`)
}

form.addEventListener("submit", e => {
  e.preventDefault()
  getGeoLocation(inputText.value)
})

location.addEventListener("click" , e => {
  e.preventDefault();
  // getCurrentPosition() will give you longitude and latitude
  // then use those values to input into getWeather(long, lat)
})
// fetch(`https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6dda46b7b0578a12825d47e372232005`).then(res => res.json()).then(json => console.log(json[0]))

// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=6dda46b7b0578a12825d47e372232005`).then(res => res.json()).then(json =>  content.innerHTML = json.weather[0]['main'])

// can use unsplash 2nd api
