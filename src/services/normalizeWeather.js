//normalizes: extract the data needed for my application
//form the weather api
//boundary between services and this application

import { APP_CONDITIONS_IDS } from "../config/constants";

const HOUR = {
  morning: 6,
  afternoon: 13,
  evening: 18,
};

//this help matches api condition tp app conditions
const API_APP_CONDITION_MAP = {
  rainy: "rain",
  snowy: "snowy",
  foggy: "fog",
  windy: "wind",
  cloudy: "cloudy",
  partlyCloudyDay: "partly-cloudy-day",
  partlyCloudyNight: "partly-cloudy-night",
  clearDay: "clear-day",
  clearNight: "clear-night",
};

function matchConditions(condition) {
  for (const [key, val] of Object.entries(API_APP_CONDITION_MAP)) {
    if (condition == val) return APP_CONDITIONS_IDS[key];
    else return null;
  }
}

export default function normalizeWeather(raw) {
  const today = raw.days[0];
  const cur = raw.currentConditions;
  const week = raw.days;

  const pickHour = (time) => today.hours[time];

  const appData = {
    current: {
      summary: {
        temperature: cur.datetime,
        condition: matchConditions(cur.icon),
      },
      airCondition: {
        windSpeed: cur.windspeed,
        feelsLike: cur.feelsLike,
        pressure: cur.pressure,
        uv: cur.uvindex,
      },
    },

    // extract hours detail from service based on defined
    // Hour constant above
    today: Object.fromEntries(
      Object.entries(HOUR).map(([label, time]) => {
        const hour = pickHour(time);
        const details = {
          temperature: hour.temp,
          condition: matchConditions(cur.icon),
        };

        return [label, details];
      }),
    ),

    week: week.map((day) => {
      return {
        date: day.datetime,
        condition: matchConditions(cur.icon),
      };
    }),
  };

  return appData;
}
