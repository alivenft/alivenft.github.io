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
        fill: true,
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(255, 171, 0, 0.5)');
          gradient.addColorStop(1, 'rgba(255, 171, 0, 0)');
          return gradient;
        },
        borderColor: '#ffab00',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ffab00',
        pointHoverBackgroundColor: '#ffab00',
        pointHoverBorderColor: '#fff',
        pointRadius: 3,
        pointHoverRadius: 1,
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
          color: '#ffab00',
        },
        grid: {
          color: 'rgba(255, 171, 0, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#ffab00',
        },
        grid: {
          color: 'rgba(255, 171, 0, 0.2)',
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
        titleColor: '#ffab00',
        bodyColor: '#fff',
        footerColor: '#ffab00',
        callbacks: {
          label: function (context) {
            return `Price: $${context.raw.toFixed(2)}`;
          },
        },
      },
      subtitle: {
        display: true,
        color: '#ffab00',
        font: {
          size: 6,
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
    <div className="chart-container mt-5" style={{ position: 'relative', height: '500px', width: '100%' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CryptoChart;
