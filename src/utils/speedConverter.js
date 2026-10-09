//utility for converting speed scales

import roundToOneDecimal from "./roundtoOneDecimal.js";

function speedConverter() {
  // converts from kilometerPerHour to milesPerHour and
  // vice-versa

  const toKmPerHour = (miles) => {
    const kmPerHour = miles / 0.621;
    const result = roundToOneDecimal(kmPerHour);

    return result;
  };

  const toMilesPerHour = (km) => {
    const milesPerHour = km * 0.621;
    const result = roundToOneDecimal(milesPerHour);

    return result;
  };

  return {
    toKmPerHour,
    toMilesPerHour,
  };
}

const speedConv = speedConverter();

export default speedConv;
