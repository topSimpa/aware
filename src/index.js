import appHandler from "./handlers/appHandler.js";
import "./reset.css";
import "./styles.css";

const cityForm = document.querySelector("form#city-form");
const cityField = document.querySelector("#city-input");
const formError = document.querySelector("#form-error");
const useLocationButton = document.querySelector("#user-location");
const loadingModal = document.querySelector("#loading-component");
const summaryCard = document.querySelector("#summary-card");
const airConditionCard = document.querySelector("#air-condition-card");
const todaysForecastCard = document.querySelector("#todays-forecast-card");
const weekForecastCard = document.querySelector("#week-forecast-card");

const app = appHandler({
  loadingModal: loadingModal,
  summaryCard: summaryCard,
  airConditionsCard: airConditionCard,
  todaysForecastCard: todaysForecastCard,
  weekForecastCard: weekForecastCard,
  formError: formError,
});

cityForm.addEventListener("submit", app.onCityFieldSubmission);
cityField.addEventListener("input", app.clearError);
cityField.addEventListener("blur", app.clearError);

useLocationButton.addEventListener("click", app.onUseLocation);
