import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const intervals = {
  '1h': 'm1',
  '24h': 'h1',
  '7d': 'd1',
  '1m': 'd1',
  '3m': 'd1',
  '1y': 'd1',
};

const MainPage = () => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [interval, setInterval] = useState('1h');
  const [livePrice, setLivePrice] = useState(null);
  const [previousPrice, setPreviousPrice] = useState(null);

  useEffect(() => {
    fetchBitcoinData();
  }, [interval]);

  useEffect(() => {
    fetchLivePrice();
    const intervalId = setInterval(fetchLivePrice, 10000); // Fetch live price every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const fetchBitcoinData = async () => {
    try {
      const startDate = interval === '1y' ? Date.now() - 365 * 24 * 60 * 60 * 1000 :
                        interval === '3m' ? Date.now() - 90 * 24 * 60 * 60 * 1000 :
                        interval === '1m' ? Date.now() - 30 * 24 * 60 * 60 * 1000 :
                        interval === '7d' ? Date.now() - 7 * 24 * 60 * 60 * 1000 :
                        interval === '24h' ? Date.now() - 24 * 60 * 60 * 1000 :
                        Date.now() - 60 * 60 * 1000; // Default to 1 hour

      const response = await axios.get(
        'https://api.coincap.io/v2/assets/bitcoin/history',
        {
          params: {
            interval: intervals[interval],
            start: startDate,
            end: Date.now(),
          },
        }
      );
      const formattedData = response.data.data.map((point) => [new Date(point.time).getTime(), parseFloat(point.priceUsd)]);
      setBitcoinData(formattedData);
    } catch (error) {
      console.error('Error fetching Bitcoin data:', error);
    }
  };

  const fetchLivePrice = async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin');
      const currentPrice = parseFloat(response.data.data.priceUsd).toFixed(2);
      setPreviousPrice(livePrice);
      setLivePrice(currentPrice);
    } catch (error) {
      console.error('Error fetching the live Bitcoin price', error);
    }
  };

  const data = {
    labels: bitcoinData.map((point) => new Date(point[0]).toLocaleString()),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: bitcoinData.map((point) => point[1]),
        borderColor: '#61dafb',
        backgroundColor: 'rgba(97, 218, 251, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Date',
          color: '#61dafb',
        },
        ticks: {
          color: '#61dafb',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
          color: '#61dafb',
        },
        ticks: {
          color: '#61dafb',
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#61dafb',
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#61dafb',
        bodyColor: '#61dafb',
        footerColor: '#61dafb',
      },
    },
  };

  return (
    <MainContainer>
      <Section>
        <LivePrice priceUp={livePrice > previousPrice}>
          Live BTC Price: ${livePrice} {livePrice && previousPrice && (livePrice > previousPrice ? '😊' : '😞')}
        </LivePrice>
        <IntervalButtons>
          {Object.keys(intervals).map((key) => (
            <button key={key} onClick={() => setInterval(key)} className={interval === key ? 'active' : ''}>
              {key}
            </button>
          ))}
        </IntervalButtons>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </Section>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  color: #61dafb;
`;

const Section = styled.section`
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(40, 44, 52, 0.8);
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const LivePrice = styled.div`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${({ priceUp }) => (priceUp ? 'green' : 'red')};
`;

const IntervalButtons = styled.div`
  margin-bottom: 20px;
  button {
    background-color: rgba(97, 218, 251, 0.1);
    color: #61dafb;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #61dafb;
      color: #282c34;
    }

    &:hover {
      background-color: #61dafb;
      color: #282c34;
    }
  }
`;

export default MainPage;
