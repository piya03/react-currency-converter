import axios from "axios";

const BASE_URL = "https://api.coindesk.com/v1/bpi/";
export const currencyConverterAPI = () => {
  return axios(`${BASE_URL}currentprice.json`)
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
    `${BASE_URL}historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`
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
