//module to render air conditions ui
import uvIcon from "../images/ui/uv.svg";
import windIcon from "../images/ui/wind.svg";
import pressureIcon from "../images/ui/pressure.svg";
import { defaultValue } from "./common.js";

import "./aircon.css";

export default function renderAirConditon({
  pressure = "",
  windDir = "",
  windSpeed = "",
  uvIndex = "",
}) {
  const airMetrics = [
    {
      key: "pressure",
      label: "pressure",
      icon: pressureIcon,
      value: pressure,
      unit: "mb",
    },
    {
      key: "winddir",
      label: "Wind direction",
      icon: windIcon,
      value: windDir,
      unit: "°",
    },
    {
      key: "windSpeed",
      label: "wind",
      icon: windIcon,
      value: windSpeed,
      unit: "mph",
    },
    {
      key: "uvIndex",
      label: "UV index",
      icon: uvIcon,
      value: uvIndex,
      unit: "",
    },
  ];

  const airMetricList = document.createElement("ul");
  airMetricList.classList.add("air-metrics");

  //fill up list with metric using airMetrics
  airMetrics.forEach((metric) => {
    const metricItem = document.createElement("li");
    const metricText = document.createElement("div");
    const metricLabel = document.createElement("p");
    const metricIcon = document.createElement("img");
    const valueBox = document.createElement("p");
    const metricValue = document.createElement("span");
    const metricUnit = document.createElement("span");

    metricItem.dataset.metric = metric.key;
    metricIcon.src = metric.icon;
    metricIcon.classList = "metric-icon";

    //text
    metricLabel.classList.add("metric-label");
    metricLabel.textContent = metric.label;

    metricValue.classList.add("metric-value");
    metricUnit.classList.add("metric-unit");
    metricValue.textContent = metric.value || defaultValue;
    metricUnit.textContent = metric.value ? metric.unit : "";
    valueBox.append(metricValue, metricUnit);

    metricText.append(metricLabel, valueBox);
    metricItem.append(metricIcon, metricText);

    airMetricList.append(metricItem);
  });

  return airMetricList;
}
