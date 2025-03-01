import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
  // Define the data for the line graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels (time or categories)
    datasets: [
      {
        label: 'Progress',
        data: [0, 5000, 20000, 75000, 200000, 500000,750000,1000000], // Y-axis values (progress over time)
        fill: false, // No area under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Point color
        tension: 0, // Smoothness of the line (0 for straight, 1 for smooth)
      },
    ],
  };

  // Define options to customize the graph
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis at 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
