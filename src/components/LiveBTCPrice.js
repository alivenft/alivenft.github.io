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

        // Set the initial price when the component mounts
        if (initialPrice === null) {
          setInitialPrice(newPrice);
        }

        // Calculate the price change percentage based on the initial price
        const newPriceChangePercentage =
          initialPrice !== null ? ((newPrice - initialPrice) / initialPrice) * 100 : null;

        setPrice(newPrice); // Update current price
        setPriceChangePercentage(newPriceChangePercentage);

        // Update color based on the price change direction
        setColor(newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000');
        localStorage.setItem('btcPriceColor', newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000');
      } catch (error) {
        console.error('Error fetching live BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, [initialPrice]); // Run effect when initialPrice changes

  return (
    <div className="live-price-container bg-hackerBlack text-hackerGreen p-4 rounded-lg shadow-lg">
      <div className="live-price text-center mb-4" style={{ color: color }}>
        <span className="label font-bold mr-2">Live BTC Price:</span>
        <span className="price font-bold">${price ? price.toFixed(2) : 'Loading...'}</span>
        {priceChangePercentage !== null && (
          <span className="price-indicator font-bold ml-2" style={{ fontSize: '0.8rem' }}>
            {priceChangePercentage > 0 ? '▲' : '▼'} ({priceChangePercentage.toFixed(2)}%)
          </span>
        )}
      </div>
    </div>
  );
};

export default LiveBTCPrice;
