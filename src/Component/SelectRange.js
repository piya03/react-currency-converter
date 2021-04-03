import React, { useState } from "react";
import "./style.css";
import moment from "moment";

const SelectRange = ({ setStartDate }) => {
  const [active, setActive] = useState("1 D");

  function setStartDateFun(noOfDays, format) {
    setStartDate(moment().subtract(noOfDays, format).format("YYYY-MM-DD"));
  }
  return (
    <div>
      <ul className="list">
        <li
          className={`${active === "1 D" ? "activeStyle" : ""}`}
          onClick={() => {
            setStartDateFun(2, "day");
            setActive("1 D");
          }}
        >
          1 D
        </li>
        <li
          className={`${active === "1 M" ? "activeStyle" : ""}`}
          onClick={() => {
            setActive("1 M");
            setStartDateFun(1, "months");
          }}
        >
          1 M
        </li>
        <li
          className={`${active === "6 M" ? "activeStyle" : ""}`}
          onClick={() => {
            setActive("6 M");
            setStartDateFun(6, "months");
          }}
        >
          6 M
        </li>
        <li
          className={`${active === "1 Y" ? "activeStyle" : ""}`}
          onClick={() => {
            setActive("1 Y");
            setStartDateFun(1, "years");
          }}
        >
          1 Y
        </li>
        <li
          className={`${active === "5 Y" ? "activeStyle" : ""}`}
          onClick={() => {
            setActive("5 Y");
            setStartDateFun(5, "years");
          }}
        >
          5 Y
        </li>
        <li
          className={`${active === "10 Y" ? "activeStyle" : ""}`}
          onClick={() => {
            setActive("10 Y");
            setStartDateFun(10, "years");
          }}
        >
          10 Y
        </li>
      </ul>
    </div>
  );
};

export default SelectRange;
