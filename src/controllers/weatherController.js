// module that fetches weather info from
// Visual crossing using city name and location

const url = {
  API_KEY: "XT5ZRN75JNPP4MG624DSUWUJC",
  base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
  parameters:
    "/next7days?unitGroup=us&include=days%2Ccurrent%2Chours&contentType=json",
};

function getWeather() {
  //happy path working well
  //sad path needs more knowledge
  //also async await function calling
  //return only needed data for display
  const makeFetch = async (endpoint) => {
    const query = `${url.base}${endpoint}${url.parameters}&key=${url.API_KEY}`;

    const response = await fetch(query);
    const locationData = await response.json();
    console.log(locationData);
    //extract app specific data for now and today
    const appData = {};
    appData.today = {
      summary: {
        time: locationData.currentConditions.datetime,
        temperature: locationData.currentConditions.temp,
        icon: locationData.currentConditions.icon,
      },
      airCondition: {
        windspeed: locationData.currentConditions.windspeed,
        feelsLike: locationData.currentConditions.feelslike,
        pressure: locationData.currentConditions.pressure,
        uv: locationData.currentConditions.uvindex,
      },
      forecast: {
        morning: locationData.days[0].hours[6].icon,
        afternoon: locationData.days[0].hours[13].icon,
        evening: locationData.days[0].hours[18].icon,
        night: locationData.days[0].hours[21].icon,
      },
    };

    //extract forecast for the week
    appData.week = [];
    locationData.days.forEach((days) => {
      const daySummary = {
        datetime: days.datetime,
        icon: days.icon,
      };
      appData.week.push(daySummary);
    });

    return appData;
  };

  const byLocation = (location) => {
    const locationString = `${location.latitude}%2C${location.longitude}`;
    makeFetch(locationString).then(console.log);
  };

  const byCity = (city) => {
    return makeFetch(city);
  };

  return {
    byLocation,
    byCity,
  };
}

const getWeatherData = getWeather();
export default getWeatherData;

// async function getLocation() {
//     const url =
//     const response = await fetch(`${url}&key=${key}`);
//     const locationData = await response.json();
//     console.log(locationData);
// }

// getLocation().catch((error) => console.log(error));
