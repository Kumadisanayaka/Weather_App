
// ===============================
// DOM Elements
// ===============================

const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchbtn");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
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

const forecastContainer =
    document.getElementById("forecastContainer");

const errorMessage =
    document.getElementById("errorMessage");


// ===============================
// API Key
// ===============================

let apiKey = "b4d3457f753e1147ff953187948d96dd";


// ===============================
// Search Button
// ===============================

searchbtn.addEventListener("click", function () {

    let city = cityInput.value.trim();

    if (city === "") {

        errorMessage.style.display = "block";
        errorMessage.textContent = "Please Enter a city name";

    } else {

        errorMessage.style.display = "none";

        getWeather(city);
    }

});


// ===============================
// Get Weather by City
// ===============================

async function getWeather(city) {

    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        let data = await response.json();


        // ===============================
        // Current Weather
        // ===============================

        displayWeather(data);


        // ===============================
        // Get Latitude & Longitude
        // ===============================

        let latitude = data.coord.lat;
        let longitude = data.coord.lon;


        // ===============================
        // Get Forecast
        // ===============================

        getForecast(latitude, longitude);


    } catch (error) {

        console.log(error.message);

        errorMessage.style.display = "block";
        errorMessage.textContent = error.message;

    }

}


// ===============================
// Display Current Weather
// ===============================

function displayWeather(data) {

    cityName.textContent = data.name;

    countryName.textContent = data.sys.country;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} km/h`;


    // Weather Icon

    let iconCode = data.weather[0].icon;

    let iconUrl =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.src = iconUrl;


    // Extra Information

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    visibility.textContent =
        `${data.visibility / 1000} Km`;


    // ===============================
    // Sunrise
    // ===============================

    let sunrisetime =
        new Date(data.sys.sunrise * 1000);

    let sunrisehours =
        sunrisetime.getHours();

    let sunriseminutes =
        sunrisetime.getMinutes();

    sunriseminutes =
        String(sunriseminutes).padStart(2, "0");

    let sunriseperiod =
        sunrisehours >= 12 ? "PM" : "AM";

    sunrisehours =
        sunrisehours % 12 || 12;


    sunrise.textContent =
        `${sunrisehours}:${sunriseminutes} ${sunriseperiod}`;


    // ===============================
    // Sunset
    // ===============================

    let sunsettime =
        new Date(data.sys.sunset * 1000);

    let sunsetHours =
        sunsettime.getHours();

    let sunsetMinutes =
        sunsettime.getMinutes();

    sunsetMinutes =
        String(sunsetMinutes).padStart(2, "0");

    let sunsetPeriod =
        sunsetHours >= 12 ? "PM" : "AM";

    sunsetHours =
        sunsetHours % 12 || 12;


    sunset.textContent =
        `${sunsetHours}:${sunsetMinutes} ${sunsetPeriod}`;
}


// ===============================
// Get 5-Day Forecast
// ===============================

async function getForecast(latitude, longitude) {

    let forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {

        let response =
            await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error("Forecast data could not be loaded");
        }

        let data =
            await response.json();


        // Clear old forecast cards

        forecastContainer.innerHTML = "";


        // ===============================
        // Loop Forecast Data
        // ===============================

        for (
            let i = 0;
            i < data.list.length;
            i++
        ) {

            // Get one forecast for each day

            if (
                data.list[i].dt_txt.includes("12:00:00")
            ) {

                let forecast =
                    data.list[i];


                // ===============================
                // Create Card
                // ===============================

                let card =
                    document.createElement("div");

                card.classList.add("forecast-card");


                // Weather Icon

                let iconCode =
                    forecast.weather[0].icon;

                let iconUrl =
                    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


                // Day

                let date =
                    new Date(forecast.dt_txt);

                let day =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long"
                        }
                    );


                // ===============================
                // Card HTML
                // ===============================

                card.innerHTML = `

                    <h3>${day}</h3>

                    <img
                        src="${iconUrl}"
                        alt="Weather icon"
                    >

                    <h4>
                        ${Math.round(forecast.main.temp)}°C
                    </h4>

                    <p>
                        ${forecast.weather[0].description}
                    </p>

                `;


                // Add card to page

                forecastContainer.appendChild(card);

            }

        }

    } catch (error) {

        console.log(error.message);

    }

}


// ===============================
// Load Current Location
// ===============================

window.addEventListener("load", function () {

    navigator.geolocation.getCurrentPosition(

        async function (position) {

            let latitude =
                position.coords.latitude;

            let longitude =
                position.coords.longitude;


            try {

                // ===============================
                // Current Weather by Location
                // ===============================

                let url =
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                let response =
                    await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        "Location weather could not be loaded"
                    );
                }

                let data =
                    await response.json();


                // Display Current Weather

                displayWeather(data);


                // ===============================
                // Display Forecast
                // ===============================

                getForecast(latitude, longitude);


            } catch (error) {

                console.log(error.message);

            }

        },


        function (error) {

            console.log(
                "Location error:",
                error.message
            );

        }

    );

});
