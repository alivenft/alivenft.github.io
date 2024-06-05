import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart';
import LiveBTCPrice from './LiveBTCPrice';
import './CryptoPriceTracker.css';

const intervals = {
  '1h': 'm1', // New interval for 1 hour
  '24h': 'h1',
  '7d': 'd1',
  '1m': 'd1',
  '3m': 'd1',
  '1y': 'd1',
};

const BitcoinPriceTracker = () => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [interval, setInterval] = useState('1h'); // Default interval to 1 hour

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const startDate = interval === '1y' ? Date.now() - 365 * 24 * 60 * 60 * 1000 :
          interval === '3m' ? Date.now() - 90 * 24 * 60 * 60 * 1000 :
          interval === '1m' ? Date.now() - 30 * 24 * 60 * 60 * 1000 : 
          interval === '7d' ? Date.now() - 7 * 24 * 60 * 60 * 1000 : 
          interval === '24h' ? Date.now() - 24 * 60 * 60 * 1000 : 
          Date.now() - 60 * 60 * 1000; // 1 hour in milliseconds

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

    fetchBitcoinData();
  }, [interval]);

  return (
    <div className="bitcoin-price-tracker-container">
      <LiveBTCPrice />
      <div className="interval-buttons">
        {Object.keys(intervals).map((key) => (
          <button key={key} onClick={() => setInterval(key)} className={interval === key ? 'active' : ''}>
            {key}
          </button>
        ))}
      </div>
      <CryptoChart data={bitcoinData} interval={interval} />
    </div>
  );
};

export default BitcoinPriceTracker;
