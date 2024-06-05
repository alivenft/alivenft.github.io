import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CryptoChart = ({ data }) => {
  const chartData = {
    labels: data.map(point => new Date(point[0]).toLocaleString()),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: data.map(point => point[1]),
        fill: false,
        backgroundColor: '#ffab00',
        borderColor: '#ffab00',
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
          color: '#ffab00',
        },
        grid: {
          color: '#ffab00',
        },
      },
      y: {
        ticks: {
          color: '#ffab00',
        },
        grid: {
          color: '#ffab00',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffab00',
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
    <div className="chart-container mt-5">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CryptoChart;
