import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Graph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: "PLC Tag Value",
        data: data.map((item) => item.value),
        borderColor: "#3b82f6",
        backgroundColor: "#bfdbfe",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="mt-4">
      <Line data={chartData} />
    </div>
  );
};

export default Graph;