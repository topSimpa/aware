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

const tempConv = tempConverter();

export default tempConv;
