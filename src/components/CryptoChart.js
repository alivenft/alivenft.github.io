import React, { useEffect, useRef } from 'react';
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
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.15)'); // Light orange
      gradient.addColorStop(1, 'rgba(255, 140, 0, 0.05)'); // More transparent orange

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [data]);

  const chartData = {
    labels: data.map(point => new Date(point[0]).toLocaleString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map(point => point[1]),
        fill: true,
        backgroundColor: 'rgba(255, 140, 0, 0.15)', // This will be overridden by the gradient
        borderColor: 'rgba(255, 140, 0, 1)', // Orange color
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(255, 140, 0, 1)', // Orange color
        pointHoverBackgroundColor: 'rgba(255, 140, 0, 1)', // Orange color
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
      <div className="btn-group btn-group-chart" role="group">
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
      </div>
      <div className="chart-wrapper">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CryptoChart;
