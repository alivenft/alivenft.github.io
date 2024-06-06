// CryptoChart.js
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
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');

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
        backgroundColor: 'rgba(255, 140, 0, 0.25)',
        borderColor: 'rgba(255, 140, 0, 1)',
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(255, 140, 0, 1)',
        pointHoverBackgroundColor: 'rgba(255, 140, 0, 1)',
        pointHoverBorderColor: '#fff',
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#e0e0e0',
        },
        grid: {
          color: 'rgba(224, 224, 224, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#e0e0e0',
          callback: function(value) {
            return parseFloat(value).toFixed(2);
          },
        },
        grid: {
          color: 'rgba(224, 224, 224, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#e0e0e0',
        bodyColor: '#e0e0e0',
        footerColor: '#e0e0e0',
        callbacks: {
          label: function (context) {
            return `Price: $${context.raw.toFixed(2)}`;
          },
        },
      },
      subtitle: {
        display: true,
        text: 'Crypto Price over Time',
        color: '#e0e0e0',
        font: {
          size: 12,
        },
        padding: {
          bottom: 10,
        },
      },
    },
    animation: {
      duration: 1000,
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
