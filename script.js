const apiKey = "a4c9187087969ba1a656f2e25fcbede8";

const button = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");
const locationBtn = document.getElementById("locationBtn");

input.addEventListener("keypress", (e) => {
if(e.key === "Enter"){
button.click();
}
});

button.addEventListener("click", () => {

const city = input.value;

result.innerHTML = "Cargando...";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
.then(response => response.json())
.then(data => {

const iconCode = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

result.innerHTML = `
<h2>${data.name}</h2>
<img class="weather-icon" src="${iconUrl}">
<p>Temperatura: ${data.main.temp} °C</p>
<p>Clima: ${data.weather[0].description}</p>
<p>Humedad: ${data.main.humidity}%</p>
<p>Viento: ${data.wind.speed} km/h</p>
`;

const clima = data.weather[0].main;

if(clima === "Clear"){
document.body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
}else if(clima === "Clouds"){
document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
}else if(clima === "Rain"){
document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
}else{
document.body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
}

})
.catch(error => {
result.innerHTML = "Ciudad no encontrada";
});

});

locationBtn.addEventListener("click", () => {

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(position => {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

getWeatherByCoords(lat, lon);

}, () => {
result.innerHTML = "No se pudo obtener la ubicación";
});

}else{
result.innerHTML = "Tu navegador no soporta geolocalización";
}

});

function getWeatherByCoords(lat, lon){

result.innerHTML = "Cargando...";

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`)
.then(response => response.json())
.then(data => {

const iconCode = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

result.innerHTML = `
<h2>${data.name}</h2>
<img class="weather-icon" src="${iconUrl}">
<p>Temperatura: ${data.main.temp} °C</p>
<p>Clima: ${data.weather[0].description}</p>
<p>Humedad: ${data.main.humidity}%</p>
<p>Viento: ${data.wind.speed} km/h</p>
`;

updateBackground(data.weather[0].main);

})
.catch(() => {
result.innerHTML = "Error al obtener el clima";
});

}

function updateBackground(clima){

if(clima === "Clear"){
document.body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
}else if(clima === "Clouds"){
document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
}else if(clima === "Rain"){
document.body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
}else{
document.body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
}

}
