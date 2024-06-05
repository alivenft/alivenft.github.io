import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const intervals = {
  '1h': 'm1',
  '24h': 'h1',
  '7d': 'd1',
  '1m': 'd1',
  '3m': 'd1',
  '1y': 'd1',
};

const CryptoChart = ({ data, interval, setInterval }) => {
  const chartData = {
    labels: data.map(point => new Date(point[0]).toLocaleString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map(point => point[1]),
        fill: true,
        backgroundColor: 'rgba(184, 0, 0, 0.2)', // Red gradient start
        borderColor: 'rgba(184, 0, 0, 1)', // Red color
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(184, 0, 0, 1)', // Red color
        pointHoverBackgroundColor: 'rgba(184, 0, 0, 1)', // Red color
        pointHoverBorderColor: '#fff',
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#e0e0e0', // Light grey color
        },
        grid: {
          color: 'rgba(224, 224, 224, 0.2)', // Light grey color
        },
      },
      y: {
        ticks: {
          color: '#e0e0e0', // Light grey color
        },
        grid: {
          color: 'rgba(224, 224, 224, 0.2)', // Light grey color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0', // Light grey color
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#e0e0e0', // Light grey color
        bodyColor: '#e0e0e0', // Light grey color
        footerColor: '#e0e0e0', // Light grey color
        callbacks: {
          label: function (context) {
            return `Price: $${context.raw.toFixed(2)}`;
          },
        },
      },
      subtitle: {
        display: true,
        color: '#e0e0e0', // Light grey color
        font: {
          size: 12,
        },
        padding: {
          bottom: 1,
        },
      },
    },
    animation: {
      duration: 1300,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div className="chart-container mt-5">
      <div className="btn-group-chart" role="group">
        {Object.keys(intervals).map(key => (
          <button 
            key={key} 
            onClick={() => setInterval(key)} 
            type="button"
            className={`btn btn-rounded btn-interval ${interval === key ? 'active' : ''}`}
          >
            {key}
          </button>
        ))}
      </div>a
      <div className="chart-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CryptoChart;
