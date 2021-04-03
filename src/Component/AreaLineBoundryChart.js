import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
const AreaLineBoundryChart = ({ xAxislabel, data }) => {
  const refContainer = useRef(null);
  const [chart, setChart] = useState(null);

  const inputs = {
    min: -100,
    max: 100,
    count: 8,
    decimals: 2,
    continuity: 1,
  };

  const generateLabels = () => {
    return xAxislabel || [];
  };

  // </block:setup>

  // <block:data:0>
  const finalData = {
    labels: generateLabels(),
    datasets: [
      {
        label: "",
        data: data || [],
        borderColor: "green",
        backgroundColor: "#e8f5ec",
      },
    ],
  };
  // </block:data>

  // <block:actions:3>
  let smooth = false;

  const actions = [
    {
      name: "Fill: false (default)",
      handler: (chart) => {
        chart.finalData.datasets.forEach((dataset) => {
          dataset.fill = false;
        });
        chart.update();
      },
    },
    {
      name: "Fill: origin",
      handler: (chart) => {
        chart.finalData.datasets.forEach((dataset) => {
          dataset.fill = "origin";
        });
        chart.update();
      },
    },
    {
      name: "Fill: start",
      handler: (chart) => {
        chart.finalData.datasets.forEach((dataset) => {
          dataset.fill = "start";
        });
        chart.update();
      },
    },
    {
      name: "Fill: end",
      handler: (chart) => {
        chart.finalData.datasets.forEach((dataset) => {
          dataset.fill = "end";
        });
        chart.update();
      },
    },
    {
      name: "Smooth",
      handler(chart) {
        smooth = !smooth;
        chart.options.elements.line.tension = smooth ? 0.4 : 0;
        chart.update();
      },
    },
  ];
  // </block:actions>

  // <block:config:1>
  const config = {
    type: "line",
    data: finalData,
    options: {
      plugins: {
        filler: {
          propagate: false,
        },
        title: {
          display: true,
          text: (ctx) => "Fill: " + ctx.chart.finalData.datasets[0].fill,
        },
      },
      legend: false,
      interaction: {
        intersect: false,
      },
    },
  };

  useEffect(() => {
    const newChart = new Chart(refContainer.current, config);
    setChart(newChart);
  }, [data]);
  return (
    <div>
      <div>
        <div>
          <canvas
            style={{
              height: "200px",
              width: "300px",
            }}
            ref={refContainer}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default AreaLineBoundryChart;
