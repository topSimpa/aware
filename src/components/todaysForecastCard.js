import { assignTemp, resolveWeatherIcon } from "./common.js";

import "./today.css";

export default function renderTodayForecast({
  unit,
  morning = "",
  afternoon = "",
  evening = "",
}) {
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
    const forecastTemp = document.createElement("p");
    const tempUnit = document.createElement("span");

    forecastItem.dataset.todayForecast = time.time;
    forecastLabel.textContent = time.label;
    resolveWeatherIcon(time.value.condition, forecastIcon);
    assignTemp({
      tempElement: forecastTemp,
      value: time.value.temperature,
      unitElement: tempUnit,
      unit: unit,
    });

    forecastTemp.append(tempUnit);
    forecastItem.append(forecastLabel, forecastIcon, forecastTemp);

    forecastList.append(forecastItem);
  });

  return forecastList;
}
