import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveBTCPrice = () => {
  const [price, setPrice] = useState(null);
  const [initialPrice, setInitialPrice] = useState(null);
  const [priceChangePercentage, setPriceChangePercentage] = useState(null);
  const [color, setColor] = useState(localStorage.getItem('btcPriceColor') || '#39FF14');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin');
        const newPrice = parseFloat(response.data.data.priceUsd);
        const newPriceChangePercentage = parseFloat(response.data.data.changePercent24Hr);
        console.log('Fetched BTC Price:', newPrice, '24hr Change:', newPriceChangePercentage);

        if (initialPrice === null) {
          setInitialPrice(newPrice);
        }

        setPrice(newPrice);
        setPriceChangePercentage(newPriceChangePercentage);

        setColor(newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000');
        localStorage.setItem('btcPriceColor', newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000');
      } catch (error) {
        console.error('Error fetching live BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, [initialPrice]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="info-container text-center p-4 m-2 rounded-lg shadow-lg" style={{ color, width: '100%' }}>
            <h2 className="mb-3">Live BTC Price</h2>
            <p className="display-4">${price !== null ? price.toFixed(2) : 'Loading...'}</p>
            {priceChangePercentage !== null && (
              <p className="mb-0">
                {priceChangePercentage > 0 ? '▲' : '▼'} ({priceChangePercentage.toFixed(2)}%)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBTCPrice;
