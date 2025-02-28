let cityinput = document.getElementById("cityInput")
let getWeather = document.getElementById("getWeather")

async function getData(cityName) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0687e16d70c3490da6172125252802&q=${cityName}&aqi=yes`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null; 
    } 
}

getWeather.addEventListener("click", async ()=>{
    let cityinputvalue = cityinput.value
    let temp = document.getElementById("temperature");
    let location = document.getElementById("location")
    let result = await getData(cityinputvalue);
    let humidity = document.getElementById("humidity")
    let weatherIcon = document.getElementById("weatherIcon")
    console.log(result)
    
    if (result && result.current){
        temp.innerText = `${result.current.temp_c}°C`;
        weatherIcon.src = `https:${result.current.condition.icon}`;
        location.innerText = `${result.location.name}, ${result.location.region}`;
        humidity.innerText = `Humidity: ${result.current.humidity}%`;
        errorMessage.innerText = ""; // Clear error message if successful
    } else {
        // Handle API errors or invalid city input
        errorMessage.innerText = "Failed to fetch weather data. Please check the city name.";
        temp.innerText = "";
        location.innerText = "";
        humidity.innerText = "";
        weatherIcon.src = ""; // Remove icon if the request fails
    }
})
