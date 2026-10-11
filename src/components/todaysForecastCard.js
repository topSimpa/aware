import { assignTemp, resolveWeatherIcon } from "./common.js";

import "./today.css";

export default function renderTodayForecast(
  { morning = "", afternoon = "", evening = "" },
  unit,
) {
  const forecastTimes = [
    { time: "morning", label: "morning", value: morning },
    { time: "afternoon", label: "afternoon", value: afternoon },
    { time: "evening", label: "evening", value: evening },
  ];
  const forecastList = document.createElement("ul");
  forecastList.classList.add("today");

  forecastTimes.forEach((time) => {
    const forecastItem = document.createElement("li");
    const forecastLabel = document.createElement("p");
    const forecastIcon = document.createElement("img");
    const valueBox = document.createElement("p");
    const forecastTemp = document.createElement("span");
    const tempUnit = document.createElement("span");

    valueBox.classList.add("value-box");

    forecastItem.dataset.todayForecast = time.time;
    forecastLabel.textContent = time.label;
    resolveWeatherIcon(time.value.condition, forecastIcon);
    assignTemp({
      tempElement: forecastTemp,
      value: time.value.temperature,
      unitElement: tempUnit,
      unit: unit,
    });

    valueBox.append(forecastTemp, tempUnit);
    forecastItem.append(forecastLabel, forecastIcon, valueBox);

    forecastList.append(forecastItem);
  });

  return forecastList;
}
