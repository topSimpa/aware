// import appHandler from "./handlers/appHandler.js";
import "./reset.css";
import "./styles.css";

import { getLocation, getCity } from "./services/locationController.js";
import getWeather from "./services/weatherController";
import { APP_UNIT_IDS } from "./config/constants.js";
import renderSummaryCard from "./components/currentSummaryCard.js";
import renderAirConditon from "./components/airConditionCard.js";
import renderTodayForecast from "./components/todaysForecastCard.js";
import renderWeekForecast from "./components/weekForecastCard.js";

const getWeatherData = getWeather(APP_UNIT_IDS.celcius);
async function loadLocationData(location) {
  try {
    const weatherData = await getWeatherData.byLocation(location);
    console.log(weatherData);
    const city = await getCity(location);

    weatherData.current.summary.name = city;
    const summaryCard = renderSummaryCard(weatherData.current.summary);
    const airConditionCard = renderAirConditon(
      weatherData.current.airCondition,
    );
    const todaysForecastCard = renderTodayForecast(weatherData.today);
    const weekForecastCard = renderWeekForecast(weatherData.week);

    console.log(summaryCard);
    console.log(airConditionCard);
    console.log(todaysForecastCard);
    console.log(weekForecastCard);
  } catch (error) {
    console.log(error);
  }
}

getLocation().then(loadLocationData).catch(console.log);

// const cityForm = document.querySelector("form#city-form");
// const loadingModal = document.querySelector("dialog.loading-component");

// const app = appHandler({ loadingModal });

// cityForm.addEventListener("submit", app.onCityFieldSubmission);
