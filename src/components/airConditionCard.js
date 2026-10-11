//module to render air conditions ui
import uvIcon from "../images/ui/uv.svg";
import feelsIcon from "../images/ui/feels.svg";
import windIcon from "../images/ui/wind.svg";
import pressureIcon from "../images/ui/pressure.svg";
import { assignSpeed, defaultValue } from "./common.js";

import "./aircon.css";

export default function renderAirConditon({
  unit,
  pressure = "",
  feelsLike = "",
  windSpeed = "",
  uvIndex = "",
}) {
  const airMetrics = [
    { key: "pressure", label: "pressure", icon: pressureIcon, value: pressure },
    {
      key: "feelsLike",
      label: "feels like",
      icon: feelsIcon,
      value: feelsLike,
    },
    {
      key: "windSpeed",
      label: "wind",
      icon: windIcon,
      value: windSpeed,
    },
    { key: "uvIndex", label: "UV index", icon: uvIcon, value: uvIndex },
  ];
  const airMetricList = document.createElement("ul");
  airMetricList.classList.add("air-metrics");

  //fill up list with metric using airMetrics
  airMetrics.forEach((metric) => {
    const metricItem = document.createElement("li");
    const metricText = document.createElement("div");
    const metricLabel = document.createElement("p");
    const metricIcon = document.createElement("img");
    const metricValue = document.createElement("p");

    metricItem.dataset.metric = metric.key;
    metricIcon.src = metric.icon;
    metricIcon.classList = "metric-icon";

    //text
    metricLabel.classList.add("metric-label");
    metricLabel.textContent = metric.label;

    metricValue.classList.add("metric-value");
    if (metric.key === "windSpeed") {
      const metricUnit = document.createElement("span");
      metricUnit.classList.add("metric-unit");

      assignSpeed({
        speedElement: metricValue,
        value: metric.value,
        unitElement: metricUnit,
        unit: unit,
      });
      metricValue.append(metricUnit);
    } else {
      console.log("metric is", metric.value);
      metricValue.textContent = metric.value || defaultValue;
    }
    metricText.append(metricLabel, metricValue);
    metricItem.append(metricIcon, metricText);

    airMetricList.append(metricItem);
  });

  return airMetricList;
}
