import appHandler from "./handlers/appHandler.js";
import "./reset.css";
import "./styles.css";

// import { getLocation, getCity } from "./controllers/locationController.js";
// import getWeatherData from "./controllers/weatherController";

// function loadLocationData(location) {
//   getWeatherData.byLocation(location);
//   getCity(location).then(console.log);
// }

// getLocation().then(loadLocationData).catch(console.log);

const cityForm = document.querySelector("form#city-form");
const loadingModal = document.querySelector("dialog.loading-component");

const app = appHandler({ loadingModal });

cityForm.addEventListener("submit", app.onCityFieldSubmission);
