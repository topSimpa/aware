import { resolveCondition, resolveWeatherIcon } from "./common.js";
import { isToday, format } from "date-fns";

export default function renderWeekForecast(listOfdaysForecast) {
  const daysForecastList = document.createElement("ul");
  daysForecastList.classList.add("days");

  listOfdaysForecast.forEach((day) => {
    const dayItem = document.createElement("li");
    const dayName = document.createElement("p");
    const conditionBox = document.createElement("div");
    const dayCondition = document.createElement("p");
    const dayIcon = document.createElement("img");
    const dayDate = document.createElement("p");

    dayItem.dataset.day = day.date;
    dayName.classList.add("day-of-week");
    if (isToday(new Date(day.date))) {
      dayName.textContent = "Today";
    } else {
      dayName.textContent = format(new Date(day.date), "EEE");
    }
    conditionBox.classList.add("condition-box");

    resolveCondition(day.condition, dayCondition);
    resolveWeatherIcon(day.condition, dayIcon);

    conditionBox.append(dayIcon, dayCondition);

    dayDate.classList.add("day-date");
    dayDate.textContent = format(new Date(day.date), "dd/MM/yy");

    dayItem.append(dayName, conditionBox, dayDate);
    daysForecastList.append(dayItem);
  });

  return daysForecastList;
}
