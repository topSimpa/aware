//ui module for the currentCondition summary
// Card
import "./summary.css";
import { format } from "date-fns";

import {
  resolveCondition,
  resolveWeatherIcon,
  assignTemp,
  defaultValue,
} from "./common.js";

export default function renderSummaryCard(
  { name = "", temperature = "", condition = "" },
  unit,
) {
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

  city.classList.add("city-name");
  city.textContent = name || defaultValue;

  today.classList.add("todays-date");
  today.textContent = format(new Date(), "EEEE, LLLL dd, yyy");
  summaryTopLeft.append(city, today);

  //bottomLeft part of the SummaryUI
  summaryBottomLeft.classList.add("summary-bottom-left");

  temp.classList.add("current-temp");

  tempUnit.classList.add("current-temp-unit");

  assignTemp({
    tempElement: temp,
    value: temperature,
    unitElement: tempUnit,
    unit: unit,
  });

  summaryBottomLeft.append(temp, tempUnit);

  summaryLeft.append(summaryTopLeft, summaryBottomLeft);

  //right part of the summaryUI
  summaryRight.classList.add("summary-right");

  cond.classList.add("current-condition");

  weatherIcon.classList.add("weather-icon");
  resolveCondition(condition, cond);
  resolveWeatherIcon(condition, weatherIcon);

  summaryRight.append(cond, weatherIcon);

  summaryContent.classList.add("summary-content");
  summaryContent.append(summaryLeft, summaryRight);

  return summaryContent;
}
