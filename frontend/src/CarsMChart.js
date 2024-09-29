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

const CarsMChart = ({ carsM }) => {
  // Create an array for all 12 months initialized with 0
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const carData = new Array(12).fill(0); // Initialize all months with 0 cars

  // Populate carData with the values from carsM data
  Object.entries(carsM).forEach(([monthNumber, dataArray]) => {
    const monthIndex = parseInt(monthNumber) - 1; // Convert string key to number and adjust for zero index
    if (dataArray.length > 0) {
      carData[monthIndex] = parseInt(dataArray[0].sum); // Get the sum value from the first object in the array
    }
  });

  // Data for the chart
  const data = {
    labels: months, // Use the month names for the x-axis
    datasets: [
      {
        label: "Total Cars",
        data: carData, // This array will now hold car totals for each month
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
        text: "Monthly Total Cars"
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

export default CarsMChart;
