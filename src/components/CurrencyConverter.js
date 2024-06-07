import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = ({ crypto }) => {
  const [usdAmount, setUsdAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [cryptoPrice, setCryptoPrice] = useState(null);

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${crypto}`);
        setCryptoPrice(parseFloat(response.data.data.priceUsd));
      } catch (error) {
        console.error('Error fetching crypto price:', error);
      }
    };

    fetchCryptoPrice();
    const interval = setInterval(fetchCryptoPrice, 10000);

    return () => {
      clearInterval(interval);
      setUsdAmount('');
      setCryptoAmount('');
    };
  }, [crypto]);

  const handleUsdChange = (e) => {
    const usdValue = e.target.value;
    setUsdAmount(usdValue);
    if (cryptoPrice) {
      setCryptoAmount((usdValue / cryptoPrice).toFixed(8));
    }
  };

  const handleCryptoChange = (e) => {
    const cryptoValue = e.target.value;
    setCryptoAmount(cryptoValue);
    if (cryptoPrice) {
      setUsdAmount((cryptoValue * cryptoPrice).toFixed(2));
    }
  };

  return (
    <div className="crypto-info-container">
      <h2 style={{ fontSize: 'auto', textAlign: 'center' }}>{`USD to ${crypto.toUpperCase()} Converter`}</h2>
      <div className="converter-wrapper" style={{ display: 'inline-flex', gap: '5px' }}>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-2">
              <input
                className="form-control"
                placeholder="Enter USD amount"
                value={usdAmount}
                onChange={handleUsdChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-2">
              <input
                className="form-control"
                placeholder={`Enter ${crypto.toUpperCase()} amount`}
                value={cryptoAmount}
                onChange={handleCryptoChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
