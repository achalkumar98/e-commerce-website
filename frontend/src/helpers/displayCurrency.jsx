const displayINRCurrency = (num) => {
  const formattter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return formattter.format(num);
};

export default displayINRCurrency;
