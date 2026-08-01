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
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

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

        if (!response.ok) {
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

        let sunrisetime = new Date(data.sys.sunrise * 1000);
        let sunrisehours = sunrisetime.getHours();
        let sunriseminutes = sunrisetime.getMinutes();

        sunriseminutes = String(sunriseminutes).padStart(2, "0");
        sunrisehours = sunrisehours % 12 || 12;

        let sunriseperiod = sunrisehours >= 12 ? "PM" : "AM";



        let sunsettime = new Date(data.sys.sunset * 1000);
        let sunsetHours = sunsettime.getHours();
        let sunsetMinutes = sunsettime.getMinutes();

        sunsetMinutes = String(sunsetMinutes).padStart(2, "0");

        let sunsetPeriod = sunsetHours >= 12 ? "PM" : "AM";

        sunsetHours = sunsetHours % 12 || 12;


        sunrise.textContent = `${sunrisehours}:${sunriseminutes} ${sunriseperiod}`;
        sunset.textContent = `${sunsetHours}:${sunsetMinutes} ${sunsetPeriod}`;


    } catch (error) {
        console.log(error.message);

    }

}

getUser();