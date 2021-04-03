import React, { useState } from "react";
import "./style.css";

const InputSelect = ({ options, selectVal, setSelectVal }) => {
  return (
    <div className="inputStyle">
      <label>1 Bitcoin Equals : </label>
      <select
        className="selectContainer"
        value={selectVal}
        onChange={(e) => {
          setSelectVal(e.target.value);
        }}
      >
        {options.map((each, i) => {
          return (
            <option key={each.value} value={each.value}>
              {each?.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputSelect;
