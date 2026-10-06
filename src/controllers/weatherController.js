// weatherController.js:
// module that fetches weather info from
// Visual crossing using city name or location
// handles how weather data is represented

const err = {
  notFound: "City not found check for Error and try again",
  other: "Error occurred please try again",
};

const url = {
  API_KEY: "XT5ZRN75JNPP4MG624DSUWUJC",
  base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
  parameters:
    "/next7days?unitGroup=us&include=days%2Ccurrent%2Chours&contentType=json",
};

function getWeather() {
  const extractAppData = (data) => {
    const appData = {};

    //extract app specific data for now and today
    appData.today = {
      summary: {
        time: data.currentConditions.datetime,
        temperature: data.currentConditions.temp,
        icon: data.currentConditions.icon,
      },
      airCondition: {
        windspeed: data.currentConditions.windspeed,
        feelsLike: data.currentConditions.feelslike,
        pressure: data.currentConditions.pressure,
        uv: data.currentConditions.uvindex,
      },
      forecast: {
        morning: {
          icon: data.days[0].hours[6].icon,
          temperature: data.days[0].hours[6].temp,
        },
        afternoon: {
          icon: data.days[0].hours[13].icon,
          temperature: data.days[0].hours[6].temp,
        },
        evening: {
          icon: data.days[0].hours[18].icon,
          temperature: data.days[0].hours[6].temp,
        },
      },
    };

    //extract forecast for the week
    appData.week = [];
    data.days.forEach((days) => {
      const daySummary = {
        datetime: days.datetime,
        icon: days.icon,
      };
      appData.week.push(daySummary);
    });

    return appData;
  };

  const makeFetch = async (endpoint) => {
    const query = `${url.base}${endpoint}${url.parameters}&key=${url.API_KEY}`;

    const response = await fetch(query);

    if (response.ok) {
      const locationData = await response.json();
      console.log(locationData);

      //getappData
      const appData = extractAppData(locationData);
      return Promise.resolve(appData);
    } else {
      if (response.status === "404") {
        return Promise.reject(err.notFound);
      } else {
        return Promise.reject(err.other);
      }
    }
  };

  const byLocation = (location) => {
    const locationString = `${location.latitude}%2C${location.longitude}`;
    makeFetch(locationString).then(console.log);
  };

  const byCity = (city) => {
    return makeFetch(city).then(console.log);
  };

  return {
    byLocation,
    byCity,
  };
}

function tempConverter() {
  const roundToOneDecimal = (val) => {
    const result = Math.round(val * 10) / 10;

    return result;
  };

  const toFarenheit = (temp) => {
    const farenheit = temp * (9 / 5) + 32;
    const result = roundToOneDecimal(farenheit);

    return result;
  };

  const toCelcius = (temp) => {
    const celcius = (temp - 32) * (5 / 9);
    const result = roundToOneDecimal(celcius);

    return result;
  };
  return {
    toCelcius,
    toFarenheit,
  };
}

const getWeatherData = getWeather();
const temperatureConverter = tempConverter();

export { getWeatherData, temperatureConverter };
