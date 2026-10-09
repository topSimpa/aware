// import appHandler from "./handlers/appHandler.js";
import "./reset.css";
import "./styles.css";

import { getLocation, getCity } from "./services/locationController.js";
import getWeather from "./services/weatherController";
import { APP_UNIT_IDS } from "./config/constants.js";
import renderSummaryCard from "./components/currentSummaryCard.js";

const getWeatherData = getWeather(APP_UNIT_IDS.celcius);
async function loadLocationData(location) {
  try {
    const weatherData = await getWeatherData.byLocation(location);
    console.log(weatherData);
    const city = await getCity(location);

    weatherData.current.summary.name = city;
    const summaryCard = renderSummaryCard(weatherData.current.summary);
    console.log(summaryCard);
  } catch (error) {
    console.log(error);
  }
}

getLocation().then(loadLocationData).catch(console.log);

// const cityForm = document.querySelector("form#city-form");
// const loadingModal = document.querySelector("dialog.loading-component");

// const app = appHandler({ loadingModal });

// cityForm.addEventListener("submit", app.onCityFieldSubmission);
