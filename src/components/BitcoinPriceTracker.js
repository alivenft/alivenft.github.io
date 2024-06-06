import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart';
import LivePrice from './LivePrice';
import Loading from './Loading';
import CurrencyConverter from './CurrencyConverter';
import { FaSearch, FaCaretDown } from 'react-icons/fa';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        setCryptoList(response.data.data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoList();
  }, []);

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

  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const matchedCrypto = cryptoList.find(
      crypto => crypto.name.toLowerCase() === normalizedSearchTerm || crypto.symbol.toLowerCase() === normalizedSearchTerm
    );

    if (matchedCrypto) {
      setCrypto(matchedCrypto.id);
      setShowWarning(false);
    } else {
      const closestMatch = cryptoList.find(
        crypto => crypto.name.toLowerCase().includes(normalizedSearchTerm) || crypto.symbol.toLowerCase().includes(normalizedSearchTerm)
      );
      if (closestMatch) {
        setCrypto(closestMatch.id);
      } else {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
      }
    }
  };

  const filteredCryptoList = cryptoList.filter(
    crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container text-center my-5">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <LivePrice crypto={crypto} />
          <div className="dropdown-wrapper ml-3">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: 'white' }}
              />
              <button className="btn btn-dark search-btn" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
            {showWarning && <div className="alert alert-warning small-alert">Cryptocurrency not found</div>}
            <div className="position-relative w-100">
              <select 
                value={crypto} 
                onChange={(e) => setCrypto(e.target.value)} 
                className="form-select"
                style={{ width: '100%' }}
              >
                {filteredCryptoList.length === 0 && (
                  <option disabled>No cryptocurrencies found</option>
                )}
                {filteredCryptoList.map(crypto => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
              <FaCaretDown className="dropdown-icon position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </div>
      </div>
      <CurrencyConverter crypto={crypto} /> {/* Include the new component */}
      {loading ? <Loading /> : <CryptoChart data={data} interval={interval} setInterval={setInterval} />}
    </div>
  );
};

export default BitcoinPriceTracker;
