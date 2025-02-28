let cityinput = document.getElementById("cityInput")
let getWeather = document.getElementById("getWeather")

async function getData(cityName) {
    let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=0687e16d70c3490da6172125252802&q=${cityName}&aqi=yes`);
    return await data.json();
}

getWeather.addEventListener("click", async ()=>{
    let cityinputvalue = cityinput.value
    let temp = document.getElementById("temperature");
    let location = document.getElementById("location")
    let result = await getData(cityinputvalue);
    let humidity = document.getElementById("humidity")
    let weatherIcon = document.getElementById("weatherIcon")
    console.log(result)
    temp.innerText = `${result.current.temp_c}` 
    weatherIcon.src = `https:${result.current.condition.icon}`
    location.innerText = `${result.location.name}, ${result.location.region}`
    humidity.innerText = `Humidity is - ${result.current.humidity}%`;
})