// module ecompases all the common functionality
// of different component
import { APP_UNIT_IDS, APP_CONDITIONS_IDS } from "../config/constants.js";
import tempConv from "../utils/tempConverter.js";

const TEMP_UNIT = {
  celcius: "°C",
  fahrenheit: "°F",
};

const defaultValue = "---";

const CONDITION_LABELS = {
  rainy: "rainy",
  snowy: "snowy",
  foggy: "foggy",
  cloudy: "cloudy",
  partialCloud: "partial-clouds",
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

const assignTemp = ({ tempElement, value, unitElement, unit }) => {
  unitElement.classList.add("temp-unit");
  tempElement.classList.add("temp");

  tempElement.textContent = value || defaultValue;
  if (!value) {
    return;
  }

  switch (unit) {
    case APP_UNIT_IDS.celcius:
      unitElement.textContent = TEMP_UNIT.celcius;

      break;
    case APP_UNIT_IDS.fahrenheit:
      unitElement.textContent = TEMP_UNIT.fahrenheit;
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
    case APP_CONDITIONS_IDS.cloudy:
      element.textContent = CONDITION_LABELS.cloudy;
      break;
    case APP_CONDITIONS_IDS.partlyCloudyDay:
    case APP_CONDITIONS_IDS.partlyCloudyNight:
      element.textContent = CONDITION_LABELS.partialCloud;
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
    element.src = icon.default;
  });
};

const getQuantities = () => {
  const tempValueList = document.querySelectorAll(".temp");
  const tempUnitList = document.querySelectorAll(".temp-unit");

  return {
    tempValueList,
    tempUnitList,
  };
};

const changeToAppUnit = ({ tempUnit, tempConverter }) => {
  const changingFields = getQuantities();

  changingFields.tempUnitList.forEach((unitField) => {
    if (unitField.textContent) {
      unitField.textContent = tempUnit;
    }
  });

  changingFields.tempValueList.forEach((valueField) => {
    if (valueField.textContent !== defaultValue) {
      valueField.textContent = tempConverter(valueField.textContent);
    }
  });
};

const changeToFarenheit = () =>
  changeToAppUnit({
    tempUnit: TEMP_UNIT.fahrenheit,
    tempConverter: tempConv.toFarenheit,
  });

const changeToCelcius = () =>
  changeToAppUnit({
    tempUnit: TEMP_UNIT.celcius,
    tempConverter: tempConv.toCelcius,
  });

export {
  defaultValue,
  assignTemp,
  resolveCondition,
  resolveWeatherIcon,
  changeToCelcius,
  changeToFarenheit,
};
