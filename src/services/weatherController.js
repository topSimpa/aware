// weatherController.js:
// module that fetches weather info from
// Visual crossing using city name or location
// handles how weather data is represented

import normalizeWeather from "./normalizeWeather.js";
import { APP_UNIT_IDS } from "../config/constants.js";

const err = {
  notFound: "City not found check for Error and try again",
  other: "Error occurred please try again",
};

const url = {
  API_KEY: "XT5ZRN75JNPP4MG624DSUWUJC",
  base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
  parameters: "/next7days?include=days%2Ccurrent%2Chours&contentType=json",
};

const unitOption = {
  celcius: "uk",
  farenheit: "us",
};

export default function getWeather(unit) {
  let selectedUnit;

  switch (unit) {
    case APP_UNIT_IDS.celcius:
      selectedUnit = unitOption.celcius;
      break;
    case APP_UNIT_IDS.fahrenheit:
      selectedUnit = unitOption.farenheit;
      break;
    default:
      selectedUnit = unitOption.celcius;
  }

  const makeFetch = async (endpoint) => {
    const query = `${url.base}${endpoint}${url.parameters}\
    &unitGroup=${selectedUnit}&key=${url.API_KEY}`;

    const response = await fetch(query);

    if (response.ok) {
      const locationData = await response.json();
      console.log(locationData);

      //getappData
      const appData = normalizeWeather;

      return Promise.resolve(appData);
    } else {
      if (response.status === "404") {
        return Promise.reject(err.notFound);
      } else {
        return Promise.reject(err.other);
      }
    }
  };

  const byLocation = (location) => {
    const locationString = `${location.latitude}%2C${location.longitude}`;
    makeFetch(locationString).then(console.log);
  };

  const byCity = (city) => {
    return makeFetch(city).then(console.log);
  };

  return {
    byLocation,
    byCity,
  };
}
