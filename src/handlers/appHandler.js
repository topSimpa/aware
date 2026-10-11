//appHandler.js
//handlers the UI changes and event handlings

import { getLocation, getCity } from "../services/locationService.js";
import getWeather from "../services/weatherService.js";
import { APP_UNIT_IDS } from "../config/constants.js";
import renderAppUnitButton from "../components/appUnitButtons.js";
import renderSummaryCard from "../components/summaryCard.js";
import renderAirConditon from "../components/airConditionCard.js";
import renderTodayForecast from "../components/todaysForecastCard.js";
import renderWeekForecast from "../components/weekForecastCard.js";
import { changeToCelcius, changeToFarenheit } from "../components/common.js";

export default function appHandler({
  loadingModal,
  summaryCard,
  airConditionsCard,
  todaysForecastCard,
  weekForecastCard,
  formError,
}) {
  let selectedUnit = APP_UNIT_IDS.celcius;

  const startUp = () => {
    renderUI();
    onUseLocation();
  };

  const selectUnit = (event) => {
    const selectedButton = event.currentTarget;

    switch (selectedButton.value) {
      case APP_UNIT_IDS.celcius:
        selectedUnit = APP_UNIT_IDS.celcius;
        changeToCelcius();
        break;
      case APP_UNIT_IDS.fahrenheit:
        selectedUnit = APP_UNIT_IDS.fahrenheit;

        changeToFarenheit();
    }
  };

  const queryOption = {
    byLocation: 1,
    byCity: 2,
  };

  const onCityFieldSubmission = (event) => {
    //cityForm Handler

    event.preventDefault();

    const cityForm = event.currentTarget;
    const cityField = cityForm.querySelector("input");

    formError.textContent = "";

    if (cityField.validity.valueMissing) {
      formError.textContent = "city is required";
      cityField.focus();
    } else {
      loading();
      loadLocationData(queryOption.byCity, cityField.value)
        .then(successLoad)
        .catch(loadingError)
        .finally(() => {
          cityForm.reset();
          closeModal();
        });
    }
  };

  const clearError = () => {
    formError.textContent = "";
  };

  const onUseLocation = () => {
    getLocation()
      .then((location) => {
        loading();

        loadLocationData(queryOption.byLocation, location)
          .then(successLoad)
          .catch(loadingError);
      })
      .catch(loadingError);
  };

  const renderUI = (weatherData, unit) => {
    if (!weatherData) {
      //for first loading state
      weatherData = {
        current: {
          airCondition: {},
          summary: {},
        },
        today: {},
        week: [],
      };
    }

    const summCard = renderSummaryCard(weatherData.current.summary, unit);
    const airCard = renderAirConditon(weatherData.current.airCondition);
    const todaysCard = renderTodayForecast(weatherData.today, unit);
    const weekCard = renderWeekForecast(weatherData.week);
    const appUnitSelection = renderAppUnitButton(selectedUnit);
    const appUnitButtons =
      appUnitSelection.querySelectorAll(`input[type="radio"]`);

    appUnitButtons.forEach((button) => {
      button.addEventListener("change", selectUnit);
    });

    summaryCard.replaceChildren(summCard);
    summaryCard.append(appUnitSelection);
    airConditionsCard.replaceChildren(airCard);
    todaysForecastCard.replaceChildren(todaysCard);
    weekForecastCard.replaceChildren(weekCard);
  };

  const successLoad = (weatherData) => {
    renderUI(weatherData, selectedUnit);
    closeModal();
  };

  const loading = () => {
    loadingModal.textContent = "loading..... in a moment";
    loadingModal.showModal();
  };

  const loadingError = (error) => {
    loadingModal.textContent = error;
    loadingModal.classList.add("error");
    if (!loadingModal.open) {
      loadingModal.showModal();
    }
    closeModal();
  };

  const closeModal = () => {
    setTimeout(() => {
      loadingModal.close();
      loadingModal.classList = "";
    }, 3000);
  };

  async function loadLocationData(option, query) {
    const getWeatherData = getWeather(selectedUnit);
    try {
      let weatherData;
      let city;
      switch (option) {
        case queryOption.byLocation:
          weatherData = await getWeatherData.byLocation(query);
          city = await getCity(query);
          break;
        case queryOption.byCity:
          weatherData = await getWeatherData.byCity(query);
          city = query;
          break;
      }

      weatherData.current.summary.name = city;
      return Promise.resolve(weatherData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //first start
  startUp();

  return {
    clearError,
    onCityFieldSubmission,
    onUseLocation,
  };
}
