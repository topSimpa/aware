//appHandler.js
//handlers the UI changes and event handlings

//todo: dynamic Import
//? can i import dynamically and store as variable

export default function appHandler({
  loadingModal,
  currentConditionsCard,
  airConditionsCard,
  todaysForecastCard,
}) {
  const onCityFieldSubmission = (event) => {
    //cityForm Handler

    event.preventDefault();

    const cityForm = event.currentTarget;
    const cityField = cityForm.querySelector("input");
    const formError = cityForm.querySelector("#form-error");

    formError.textContent = "";

    if (cityField.validity.valueMissing) {
      formError.textContent = "city is required";
      cityField.focus();
    } else {
      loading();
    }

    //because error only shows up on first submission
    //clear error
    const clearError = () => {
      formError.textContent = "";
    };
    // on input
    cityField.addEventListener("input", clearError);
    // on loose-focus
    cityField.addEventListener("blur", clearError);
  };

  const loading = () => {
    loadingModal.textContent = "loading..... in a moment";
    loadingModal.showModal();
  };

  const closeModal = () => {
    loadingModal.close();
  };

  const changeCity = (name) => {
    //responsible for changing city's name
    const city = currentConditionsCard.querySelector("city");
    city.textContent = name;
  };

  const changeCurrentCondition = ({ temperature, icon }) => {
    //handles ui-changes for current conditions
    const tempUI = currentConditionsCard.querySelector("#temp");
    const summary = currentConditionsCard.querySelector("#summary");
    const weatherIcon = currentConditionsCard.querySelector("#weather-icon");

    tempUI.textContent = temperature;
    summary.textContent = icon;

    import(`../images/${icon}.svg`).then((module) => {
      weatherIcon.src = module.default;
    });
  };

  const changeAirCondition = ({ windSpeed, feelsLike, pressure, uv }) => {
    const windSpeedUI = airConditionsCard.querySelector("#windspeed");
    const feelsLikeUI = airConditionsCard.querySelector("#feels-like");
    const pressureUI = airConditionsCard.querySelector("#pressure");
    const uvIndex = airConditionsCard.querySelector("#uv-index");

    //changing only UI values
    const changeValue = (ui, val) => {
      const uiValue = ui.querySelector(".element-value");
      uiValue.textContent = val;
    };

    changeValue(windSpeedUI, windSpeed);
    changeValue(feelsLikeUI, feelsLike);
    changeValue(pressure, pressureUI);
    changeValue(uvIndex);
  };

  changetodayForecast = ({ morning, afternoon, evening }) => {
    const morningUI = todaysForecastCard.querySelector("#morning");
    const afternoonUI = todaysForecastCard.querySelector("#afternoon");
    const eveningUI = todaysForecastCard.querySelector("#evening");

    const changeContent = (ui, content) => {
      const icon = ui.querySelector(".icon");
      const temperature = ui.querySelector(".temp");

      icon.src = content.icon;
      temperature.textContent = content.temperature;
    };

    const changeWeekForecast = (days) => {};

    changeContent(morningUI, morning);
    changeContent(afternoonUI, afternoon);
    changeContent(eveningUI, evening);
  };

  return {
    onCityFieldSubmission,
  };
}

//*Parts to handle
//? location-form

//? current-condition
//? air-condition
//? todays-forecast
//? week-forecast
//todo: add celcius to degree functionality
