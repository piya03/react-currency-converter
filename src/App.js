import React, { useState, useEffect } from "react";
import InputSelect from "./Component/InputSelect";
import AreaLineBoundryChart from "./Component/AreaLineBoundryChart";
import SelectRange from "./Component/SelectRange";
import "./App.css";
import { currencyConverterAPI, getHistoricalBitcoinAPI } from "./api/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
function App() {
  const [selectVal, setSelectVal] = useState("");

  const [loading, setLoading] = useState(false);
  const [currencyInfo, setCurrencyInfo] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().subtract(2, "day").format("YYYY-MM-DD")
  );
  const [endDate] = useState(moment().format("YYYY-MM-DD"));
  const [chartLabel, setChartLabel] = useState();
  const [data, setData] = useState();

  //currency converter
  async function currencyConvertFun() {
    try {
      setLoading(true);
      const res = await currencyConverterAPI();

      if (res?.status === 200) {
        setLoading(false);
        setCurrencyInfo(res?.data);
        const currencies = Object.keys(res?.data?.bpi || {});

        setSelectVal(currencies[0]);
      }
    } catch (e) {
      setLoading(true);
      console.warn("Error in fetching");
    }
  }

  ///////get Historical Bitcoin
  async function getHistoricalBitcoinFun() {
    try {
      const res = await getHistoricalBitcoinAPI({
        currency: selectVal,
        startDate: startDate,
        endDate: endDate,
      });

      setChartLabel(
        Object.keys(res?.data?.bpi).map((each) => {
          return moment(each).format("DD MMM");
        })
      );
      setData(Object.values(res?.data?.bpi));
      if (res?.status === 200) {
      }
    } catch (e) {
      console.warn("Error in fetching");
    }
  }

  useEffect(() => {
    if (selectVal) {
      getHistoricalBitcoinFun();
    }
  }, [selectVal, startDate]);
  useEffect(() => {
    currencyConvertFun();
  }, []);

  const options = Object.keys(currencyInfo?.bpi || {}).map((each) => {
    return {
      label: currencyInfo?.bpi[each].description,
      value: currencyInfo?.bpi[each].code,
      ...(currencyInfo?.bpi[each] || {}),
    };
  });

  function rateAndDescriptionFun() {
    if (!currencyInfo?.bpi?.[selectVal]?.code) return;
    if (currencyInfo?.bpi?.[selectVal]?.code) {
      return {
        rate: currencyInfo?.bpi[selectVal]?.rate,
        description: currencyInfo?.bpi[selectVal].description,
      };
    }
  }

  const rateDescription = rateAndDescriptionFun();
  return (
    <>
      <div className="heading">React Currency Converter</div>

      <div className="container">
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="leftContainer">
              <InputSelect
                options={options}
                selectVal={selectVal}
                setSelectVal={setSelectVal}
              />
              <div className="rupee">
                <span>{rateDescription?.rate} </span>
                <br />
                <span>{rateDescription?.description}</span>
              </div>
            </div>
            <div>
              <SelectRange setStartDate={setStartDate} />
              <AreaLineBoundryChart data={data} xAxislabel={chartLabel} />
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}

export default App;
