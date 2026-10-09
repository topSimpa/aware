// module ecompases all the common functionality
// of different component
import { APP_UNIT, APP_CONDITIONS_IDS } from "../config/constants.js";

const TEMP_UNIT = {
  celcius: "°C",
  fahrenheit: "°F",
};

const defaultValue = "---";

const SPEED_UNIT = {
  miles: "mph",
  kilometer: "km/h",
};

const CONDITION_LABELS = {
  rainy: "rainy",
  snowy: "snowy",
  foggy: "foggy",
  cloudy: "cloudy",
  clearDay: "sunny",
  clearNight: "clear night",
  windy: "windy",
};

//matches the name of the icons in
//../images/weather-icon
const CONDITION_ICONS = {
  rainy: "rain",
  snowy: "clear-night",
  foggy: "fog",
  cloudy: "cloud",
  partlyCloudyDay: "partly-cloudy-day",
  partlyCloudyNight: "partly-cloudy-night",
  clearDay: "clear-day",
  clearNight: "clear-night",
  windy: "",
};

const assignSpeedUnit = (unit, element) => {
  element.classList.add("temp");
  switch (unit) {
    case APP_UNIT.celcius:
      element.textContent = SPEED_UNIT.kilometer;
      break;
    case APP_UNIT.fahrenheit:
      element.textContent = SPEED_UNIT.miles;
      break;
  }
};

const assignTempUnit = (unit, element) => {
  element.classList.add("speed");
  switch (unit) {
    case APP_UNIT.celcius:
      element.textContent = TEMP_UNIT.celcius;
      break;
    case APP_UNIT.fahrenheit:
      element.textContent = TEMP_UNIT.fahrenheit;
      break;
  }
};

const resolveCondition = (condition, element) => {
  if (!condition) {
    element.textContent = defaultValue;
    return;
  }
  switch (condition) {
    case APP_CONDITIONS_IDS.rainy:
      element.textContent = CONDITION_LABELS.rainy;
      break;
    case APP_CONDITIONS_IDS.clearDay:
      element.textContent = CONDITION_LABELS.clearDay;
      break;
    case APP_CONDITIONS_IDS.clearNight:
      element.textContent = CONDITION_LABELS.clearNight;
      break;
    case APP_CONDITIONS_IDS.foggy:
      element.textContent = CONDITION_LABELS.foggy;
      break;
    case APP_CONDITIONS_IDS.snowy:
      element.textContent = CONDITION_LABELS.snowy;
      break;
    case APP_CONDITIONS_IDS.windy:
      element.textContent = CONDITION_LABELS.windy;
      break;
    case APP_CONDITIONS_IDS.cloudy ||
      APP_CONDITIONS_IDS.partlyCloudyDay ||
      APP_CONDITIONS_IDS.partlyCloudyNight:
      element.textContent = CONDITION_LABELS.cloudy;
      break;
  }
};

const resolveWeatherIcon = (condition, element) => {
  if (!condition) {
    return;
  }
  let weatherIcon;
  switch (condition) {
    case APP_CONDITIONS_IDS.rainy:
      weatherIcon = CONDITION_ICONS.rainy;
      break;
    case APP_CONDITIONS_IDS.clearDay:
      weatherIcon = CONDITION_ICONS.clearDay;
      break;
    case APP_CONDITIONS_IDS.clearNight:
      weatherIcon = CONDITION_ICONS.clearNight;
      break;
    case APP_CONDITIONS_IDS.foggy:
      weatherIcon = CONDITION_ICONS.foggy;
      break;
    case APP_CONDITIONS_IDS.snowy:
      weatherIcon = CONDITION_ICONS.snowy;
      break;
    case APP_CONDITIONS_IDS.windy:
      weatherIcon = CONDITION_ICONS.snowy;
      break;
    case APP_CONDITIONS_IDS.cloudy:
      weatherIcon = CONDITION_ICONS.cloudy;
      break;
    case APP_CONDITIONS_IDS.partlyCloudyDay:
      weatherIcon = CONDITION_ICONS.partlyCloudyDay;
      break;
    case APP_CONDITIONS_IDS.partlyCloudyNight:
      weatherIcon = CONDITION_ICONS.partlyCloudyNight;
      break;
  }

  import(`../images/weather-icon/${weatherIcon}.svg`).then((icon) => {
    element.src = icon;
  });
};

export {
  defaultValue,
  assignTempUnit,
  assignSpeedUnit,
  resolveCondition,
  resolveWeatherIcon,
};
