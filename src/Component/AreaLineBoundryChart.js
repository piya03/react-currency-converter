import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
const AreaLineBoundryChart = ({ xAxislabel, data }) => {
  const refContainer = useRef(null);
  const [chart, setChart] = useState(null);

  const generateLabels = () => {
    return xAxislabel || [];
  };

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
    return () => chart?.destroy();
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
