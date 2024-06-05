import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CryptoChart = ({ data, interval }) => {
  const chartData = {
    labels: data.map((point) => new Date(point[0]).toLocaleString()),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: data.map((point) => point[1]),
        fill: false,
        backgroundColor: '#61dafb',
        borderColor: '#61dafb',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#61dafb',
        },
        grid: {
          color: '#61dafb',
        },
      },
      y: {
        ticks: {
          color: '#61dafb',
        },
        grid: {
          color: '#61dafb',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#61dafb',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#39ff14',
        bodyColor: '#39ff14',
        footerColor: '#39ff14',
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CryptoChart;
