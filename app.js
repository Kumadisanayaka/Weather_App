const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");

let errorMessage = document.getElementById("errorMessage");



searchbtn.addEventListener("click", function () {
    let city = cityInput.value.trim();

    if (city === "") {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please Enter a city name";

    } else {
        errorMessage.style.display = "none";
        getWeather(city);
    }

})

let apiKey = "b4d3457f753e1147ff953187948d96dd";



async function getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        let response = await fetch(url)

        if(!response.ok){
            throw new Error("something went wrong");

        }

        let data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${data.main.temp}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}--%`;
        wind.textContent = `${data.wind.speed}-- km/h`;

        let iconCode = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.src = iconUrl;

        feelsLike.textContent = `${data.main.feels_like}°C`;
        pressure.textContent = `${data.main.pressure} hPa`;
        visibility.textContent = `${data.visibility / 1000}Km`;

    } catch (error) {
        console.log(error.message);

    }

}

getUser();