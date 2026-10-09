//ui module for the currentCondition summary
// Card

import {
  resolveCondition,
  resolveWeatherIcon,
  assignTempUnit,
  defaultValue,
} from "./common.js";

export default function renderSummaryCard({
  name = "",
  temperature = "",
  condition = "",
  unit = "",
}) {
  const summaryContent = document.createElement("div");
  const summaryLeft = document.createElement("div");
  const summaryRight = document.createElement("div");
  const summaryTopLeft = document.createElement("div");
  const summaryBottomLeft = document.createElement("div");
  const city = document.createElement("h2");
  const today = document.createElement("span");
  const cond = document.createElement("span");
  const weatherIcon = document.createElement("img");
  const temp = document.createElement("span");
  const tempUnit = document.createElement("span");

  // left part of the summary UI
  summaryLeft.classList.add("summary-left");
  // topLeft part of the Summary UI
  summaryTopLeft.classList.add("summary-top-left");
  // cityName
  city.dataset.city = "city-name";
  city.textContent = name || defaultValue;
  // todaysDate
  today.dataset.date = "todays-date";
  today.textContent = new Date(); //todo: convert to format use date-fns

  summaryTopLeft.append(city, today);

  //bottomLeft part of the SummaryUI
  summaryBottomLeft.classList.add("summary-bottom-left");
  //temperature
  temp.dataset.temp = "current-temp";
  temp.textContent = temperature || defaultValue;
  //unit
  tempUnit.dataset.tempUnit = "temp-unit";
  assignTempUnit(unit, tempUnit);

  summaryBottomLeft.append(temp, tempUnit);

  summaryLeft.append(summaryTopLeft, summaryBottomLeft);

  //right part of the summaryUI
  summaryRight.classList.add("summary-right");
  //condition
  cond.dataset.condition = "current-condition";
  //weather-icon
  weatherIcon.dataset.icon = "weather-icon";
  resolveCondition(condition, cond);
  resolveWeatherIcon(condition, weatherIcon);
  //append to right
  summaryRight.append(cond, weatherIcon);

  //everything together
  summaryContent.classList.add("summary-content");
  summaryContent.append(summaryLeft, summaryRight);

  return summaryContent;
}
