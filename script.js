const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchBtn");
const results = document.getElementById("results");
const openWeatherKey = "f4735ba93558a4d6fde58d01da65c5f3";

async function addToResult(){
const cityName = cityInput.value;
if(cityName.trim( ) === ""){
    console.log("Please enter a city");
    return; //Stops function early

} else {

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherKey}&units=imperial`;
        results.innerHTML = "<p>Loading...</p>";
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Populate weather card with data
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>${data.weather[0].main}</p>
        <p>${data.main.temp}°F</p>
        <p>Feels like: ${data.main.feels_like}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} mph</p>`;


        results.innerHTML = ""; //Clear previous card to ensure 1 at a time
        results.append(card); //Append to results grid

    } catch (error){
        results.innerHTML = `<p style ="color:red;">City not found. Please try again.</p>`;
    }
    }
}


searchButton.addEventListener("click", addToResult) //Don't include parenthesis in function reference

cityInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        addToResult();
    }
})
