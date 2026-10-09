//utils to help with rounding

const roundToOneDecimal = (val) => {
  const result = Math.round(val * 10) / 10;

  return result;
};

export default roundToOneDecimal;
