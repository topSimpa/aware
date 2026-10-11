import { APP_UNIT_IDS } from "../config/constants.js";

import "./appButtons.css";

export default function renderAppUnitButton(selectedUnit) {
  const appUnits = {
    celcius: "°C",
    fahrenheit: "°F",
  };
  const appUnitBox = document.createElement("div");
  appUnitBox.classList.add("app-unit-box");

  Object.entries(APP_UNIT_IDS).forEach(([key, id]) => {
    const unitLabel = document.createElement("label");
    const unitInput = document.createElement("input");

    unitLabel.htmlFor = `${key}-button`;

    unitInput.type = "radio";
    unitInput.id = `${key}-button`;
    unitInput.name = "app-unit";
    unitInput.value = id;

    if (id == selectedUnit) {
      unitInput.checked = true;
    }

    unitLabel.append(unitInput, appUnits[key]);
    appUnitBox.append(unitLabel);
  });

  return appUnitBox;
}
