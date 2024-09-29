import React from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register components in ChartJS
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AvgCarsChart = ({ avgCarsH }) => {
  // Prepare data for the chart
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')); // Array of hours 00 to 23
  const hourTotals = new Array(24).fill(0); // To hold total sums for each hour
  const hourCounts = new Array(24).fill(0); // To hold counts of how many entries for each hour

  // Loop through the input data to sum and count for each hour
  for (const day in avgCarsH) {
    avgCarsH[day].forEach(entry => {
      const hourIndex = parseInt(entry.hour); // Get the index for the hour
      hourTotals[hourIndex] += parseFloat(entry.average_count); // Sum the values (convert Decimal to float)
      hourCounts[hourIndex] += 1; // Count occurrences
    });
  }

  // Calculate averages for each hour
  const avgData = hourTotals.map((total, index) => hourCounts[index] > 0 ? total / hourCounts[index] : 0);

  // Data for the chart
  const data = {
    labels: hours, // Use the hours as labels
    datasets: [
      {
        label: "Average Cars",
        data: avgData, // Averages for each hour
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)"
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      title: {
        display: true,
        text: "Average Cars per Hour"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default AvgCarsChart;
