import "./reset.css";
import "./styles.css";

import getLocation from "./controllers/locationController.js";
import getWeatherData from "./controllers/weatherController";

function loadLocationData(location) {
  getWeatherData.byLocation(location);
}

getLocation().then(loadLocationData).catch(console.log);
