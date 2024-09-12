const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");
const day = document.querySelector(".day");
const icon = document.querySelector(".icon");
const country = document.querySelector(".cntry_name");

const temperatureC = document.querySelector(".celcius label");
const tempF = document.querySelector(".fahrenheit label");
const wind = document.querySelector(".wind label");
const humidity = document.querySelector(".humidity label");
const visibility = document.querySelector(".visibility label");
const pressure = document.querySelector(".pressure label");
const uv = document.querySelector(".uv label");
const w_text = document.querySelector(".w_text label");


searchBtn.addEventListener("click", () => {
  if (searchInput.value== "") {
    searchInput.focus();
    return;
  }
  weathercdn(searchInput.value);
  fetchFiveDayForecast(searchInput.value);
});

function weathercdn(loc) {
  const api_key = "5c7e339c5d184963b17163557242701";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${loc}`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(json => {
      console.log(json);

      if (json && json.current) {
        country.innerHTML = json.location.name;
        icon.src = json.current.condition.icon;
        day.innerHTML = "Last updated: " + json.current.last_updated;
        temperatureC.innerHTML = json.current.temp_c;
        tempF.innerHTML = json.current.temp_f;
        w_text.innerHTML = json.current.condition.text;
        wind.innerHTML = json.current.wind_kph + "/kph";
        humidity.innerHTML = json.current.humidity + "%";
        visibility.innerHTML = json.current.vis_km + "km";
        pressure.innerHTML = json.current.pressure_in + "in";
        uv.innerHTML = json.current.uv;
      }
    })
    .catch(error => {
      console.error("Error fetching current weather:", error);

      alert("Error Enter correct location or Please try again later.");
    });
}

function fetchFiveDayForecast(loc) {
  const api_key = "5c7e339c5d184963b17163557242701";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${loc}&days=5`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
      const forecastDays = document.querySelector(".forecast-days");
      forecastDays.innerHTML = ""; 

      if (json && json.forecast && json.forecast.forecastday) {
        json.forecast.forecastday.forEach(day => {
          const forecastCard = document.createElement("div");
          forecastCard.classList.add("forecast-card");

          forecastCard.innerHTML = `
            <h3>${day.date}</h3>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>Max Temp: ${day.day.maxtemp_c}°C</p>
            <p>Min Temp: ${day.day.mintemp_c}°C</p>
            <p>Condition: ${day.day.condition.text}</p>
          `;

          forecastDays.appendChild(forecastCard);
        });
      }
    })
    .catch(error => {
      console.error("Error fetching forecast:", error);
    });
}
