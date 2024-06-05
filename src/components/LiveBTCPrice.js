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

        if (initialPrice === null) {
          setInitialPrice(newPrice);
        }

        const newPriceChangePercentage =
          initialPrice !== null ? ((newPrice - initialPrice) / initialPrice) * 100 : null;

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
    <div className="live-price-container text-center p-4 rounded-lg shadow-lg" style={{ color }}>
      <h2>Live BTC Price</h2>
      <p className="display-4">${price ? price.toFixed(2) : 'Loading...'}</p>
      {priceChangePercentage !== null && (
        <p>
          {priceChangePercentage > 0 ? '▲' : '▼'} ({priceChangePercentage.toFixed(2)}%)
        </p>
      )}
    </div>
  );
};

export default LiveBTCPrice;
