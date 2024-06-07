import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart';
import Loading from './Loading';
import CurrencyConverter from './CurrencyConverter';
import CoinTable from './CoinTable';

const intervals = {
  '1h': 'm1',
  '24h': 'h1',
  '7d': 'd1',
  '1m': 'd1',
  '3m': 'd1',
  '1y': 'd1',
};

const BitcoinPriceTracker = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState('1h');
  const [crypto, setCrypto] = useState('bitcoin');
  const [loading, setLoading] = useState(true);
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const enrichedCryptoList = await Promise.all(
          response.data.data.map(async (crypto) => {
            const sparklineResponse = await axios.get(`https://api.coincap.io/v2/assets/${crypto.id}/history?interval=h1`);
            const sparkline = sparklineResponse.data.data.map(point => parseFloat(point.priceUsd));
            return {
              ...crypto,
              changePercent24Hr: parseFloat(crypto.changePercent24Hr),
              icon: `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`,
              sparkline,
            };
          })
        );
        setCryptoList(enrichedCryptoList);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoList();
  }, []);

  useEffect(() => {
    const calculateStartDate = (interval) => {
      const now = Date.now();
      switch (interval) {
        case '1y':
          return now - 365 * 24 * 60 * 60 * 1000;
        case '3m':
          return now - 90 * 24 * 60 * 60 * 1000;
        case '1m':
          return now - 30 * 24 * 60 * 60 * 1000;
        case '7d':
          return now - 7 * 24 * 60 * 60 * 1000;
        case '24h':
          return now - 24 * 60 * 60 * 1000;
        default:
          return now - 60 * 60 * 1000;
      }
    };

    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const startDate = calculateStartDate(interval);
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${crypto}/history`,
          {
            params: {
              interval: intervals[interval],
              start: startDate,
              end: Date.now(),
            },
          }
        );
        const formattedData = response.data.data.map((point) => [
          new Date(point.time).getTime(),
          parseFloat(point.priceUsd),
        ]);
        setData(formattedData);
      } catch (error) {
        console.error(`Error fetching data for ${crypto}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [interval, crypto]);

  return (
    <div className="outer-container">
      <div className="main-container text-center my-5">
        <CoinTable cryptoList={cryptoList} setCrypto={setCrypto} />
        <div id="crypto-details">
          <CurrencyConverter crypto={crypto} />
          {loading ? (
            <Loading />
          ) : (
            <CryptoChart data={data} interval={interval} setInterval={setInterval} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BitcoinPriceTracker;
