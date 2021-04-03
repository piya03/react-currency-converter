import axios from "axios";

export const currencyConverterAPI = () => {
  return axios(`https://api.coindesk.com/v1/bpi/currentprice.json`)
    .then((res) => {
      if (res?.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      return {
        isError: true,
        err: err,
      };
    });
};

////for chart bar
export const getHistoricalBitcoinAPI = ({ currency, startDate, endDate }) => {
  return axios(
    `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`
  )
    .then((res) => {
      if (res?.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      return {
        isError: true,
        err: err,
      };
    });
};
