//appHandler.js
//handlers the UI changes and event handlings

import { getLocation, getCity } from "../services/locationController.js";
import getWeather from "../services/weatherController.js";
import { APP_UNIT_IDS } from "../config/constants.js";
import renderSummaryCard from "../components/currentSummaryCard.js";
import renderAirConditon from "../components/airConditionCard.js";
import renderTodayForecast from "../components/todaysForecastCard.js";
import renderWeekForecast from "../components/weekForecastCard.js";

export default function appHandler({
  loadingModal,
  summaryCard,
  airConditionsCard,
  todaysForecastCard,
  weekForecastCard,
  formError,
}) {
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
        .then((weatherData) => {
          renderUI(weatherData);
        })
        .catch(loadingError)
        .finally(() => {
          cityForm.reset();
          setTimeout(closeModal, 30);
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
        console.log(location);
        loadLocationData(queryOption.byLocation, location)
          .then((weatherData) => {
            renderUI(weatherData);
            closeModal();
          })
          .catch(loadingError)
          .finally(() => {
            setTimeout(closeModal, 30);
          });
      })
      .catch(loadingError);
  };

  const renderUI = (weatherData) => {
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
    const summCard = renderSummaryCard(weatherData.current.summary);
    const airCard = renderAirConditon(weatherData.current.airCondition);
    const todaysCard = renderTodayForecast(weatherData.today);
    const weekCard = renderWeekForecast(weatherData.week);

    console.log(summCard);
    console.log(airCard);
    console.log(todaysCard);
    console.log(weekCard);

    summaryCard.replaceChildren(summCard);
    airConditionsCard.replaceChildren(airCard);
    todaysForecastCard.replaceChildren(todaysCard);
    weekForecastCard.replaceChildren(weekCard);
  };

  const loading = () => {
    loadingModal.textContent = "loading..... in a moment";
    loadingModal.showModal();
  };

  const loadingError = (error) => {
    if (!loadingModal.open) {
      loadingModal.showModal();
    }
    loadingModal.textContent = error;
  };

  const closeModal = () => {
    loadingModal.close();
  };

  async function loadLocationData(option, query) {
    const getWeatherData = getWeather(APP_UNIT_IDS.celcius);
    try {
      let weatherData;
      let city;
      switch (option) {
        case queryOption.byLocation:
          weatherData = await getWeatherData.byLocation(query);
          city = await getCity(query);
          break;
        case queryOption.byCity:
          console.log("here for city");
          weatherData = await getWeatherData.byCity(query);
          city = query;
          break;
      }
      console.log(weatherData);
      weatherData.current.summary.name = city;
      return Promise.resolve(weatherData);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  renderUI();

  return {
    clearError,
    onCityFieldSubmission,
    onUseLocation,
  };
}
