export const formatMoney = (number) =>
  Number(number)?.toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
