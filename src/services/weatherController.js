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
    const query = `${url.base}${endpoint}${url.parameters}&unitGroup=${selectedUnit}&key=${url.API_KEY}`;

    const response = await fetch(query);

    if (response.ok) {
      const locationData = await response.json();
      console.log(locationData);

      //getappData
      const appData = normalizeWeather(locationData);

      return Promise.resolve(appData);
    } else {
      if (response.status === "404") {
        return Promise.reject(err.notFound);
      } else {
        return Promise.reject(err.other);
      }
    }
  };

  const byLocation = async (location) => {
    try {
      const locationString = `${location.latitude}%2C${location.longitude}`;
      const appData = await makeFetch(locationString);
      return Promise.resolve(appData);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const byCity = async (city) => {
    try {
      const appData = makeFetch(city);
      Promise.resolve(appData);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    byLocation,
    byCity,
  };
}
