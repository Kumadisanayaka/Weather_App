const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

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

        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        

    } catch (error) {
        console.log(error.message);

    }

}

getUser();