import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart';
import LivePrice from './LivePrice';
import Loading from './Loading';
import bitcoinIcon from './btc.svg';
import ethereumIcon from './eth.svg';
import dogecoinIcon from './doge.svg';
import litecoinIcon from './ltc.svg';

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

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const startDate = interval === '1y' ? Date.now() - 365 * 24 * 60 * 60 * 1000 :
          interval === '3m' ? Date.now() - 90 * 24 * 60 * 60 * 1000 :
          interval === '1m' ? Date.now() - 30 * 24 * 60 * 60 * 1000 :
          interval === '7d' ? Date.now() - 7 * 24 * 60 * 60 * 1000 :
          interval === '24h' ? Date.now() - 24 * 60 * 60 * 1000 :
          Date.now() - 60 * 60 * 1000;

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
        const formattedData = response.data.data.map(point => [new Date(point.time).getTime(), parseFloat(point.priceUsd)]);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [interval, crypto]);

  return (
    <div className="container text-center my-5">
      <div className="btn-group mt-4" role="group">
        {['bitcoin', 'ethereum', 'dogecoin', 'litecoin'].map(key => (
          <button 
            key={key} 
            onClick={() => setCrypto(key)} 
            type="button"
            className={`btn btn-rounded crypto-btn ${crypto === key ? 'active' : ''}`}
          >
            <img src={{ bitcoin: bitcoinIcon, ethereum: ethereumIcon, dogecoin: dogecoinIcon, litecoin: litecoinIcon }[key]} alt={`${key} icon`} width="20" height="20" className="me-2" />
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      <LivePrice crypto={crypto} />
      {loading ? <Loading /> : <CryptoChart data={data} interval={interval} setInterval={setInterval} />}
    </div>
  );
};

export default BitcoinPriceTracker;
