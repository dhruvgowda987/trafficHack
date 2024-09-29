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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CarsYChart = ({ carsY }) => {
  const years = []; // To hold the years
  const carData = []; // To hold the total cars for each year

  // Extract years and their corresponding car totals
  Object.entries(carsY).forEach(([year, dataArray]) => {
    years.push(year); // Collect the year
    if (dataArray.length > 0) {
      carData.push(parseInt(dataArray[0].sum)); // Get the sum value from the first object in the array
    } else {
      carData.push(0); // If no data for that year, push 0
    }
  });

  // Sort the years and carData together
  const sortedEntries = years.map((year, index) => [year, carData[index]]).sort(([a], [b]) => a - b);
  
  // Unzip sorted entries back to years and carData
  const sortedYears = sortedEntries.map(([year]) => year);
  const sortedCarData = sortedEntries.map(([, cars]) => cars);

  // Data for the chart
  const data = {
    labels: sortedYears, // Use the sorted years for the x-axis
    datasets: [
      {
        label: "Total Cars",
        data: sortedCarData, // This array will hold car totals for each year
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
        text: "Total Cars by Year"
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

export default CarsYChart;
