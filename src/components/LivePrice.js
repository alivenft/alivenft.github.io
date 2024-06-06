import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LivePrice = ({ crypto }) => {
  const [price, setPrice] = useState(null);
  const [priceChangePercentage, setPriceChangePercentage] = useState(null);
  const [color, setColor] = useState(localStorage.getItem(`${crypto}PriceColor`) || '#39FF14');
  const [priceClass, setPriceClass] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${crypto}`);
        const newPrice = parseFloat(response.data.data.priceUsd);
        const newPriceChangePercentage = parseFloat(response.data.data.changePercent24Hr);

        if (price !== null && newPrice !== price) {
          const newColor = newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000';
          setColor(newColor);
          localStorage.setItem(`${crypto}PriceColor`, newColor);

          // Trigger animation class
          setPriceClass(newPrice > price ? 'price-change-up' : 'price-change-down');

          // Remove animation class after 1 second
          setTimeout(() => {
            setPriceClass('');
          }, 1000);
        }

        setPrice(newPrice);
        setPriceChangePercentage(newPriceChangePercentage);
      } catch (error) {
        console.error('Error fetching live price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, [crypto, price]);

  return (
    <div className="live-price-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <h2 className="crypto-name" style={{ fontSize: '1.4rem', margin: '0 auto' }}>
        {crypto.toUpperCase()}
      </h2>
      <p className={`price ${priceClass}`} style={{ alignItems: 'center', fontSize: '1.3rem', margin: '0 10px' }}>
        ${price !== null ? price.toFixed(2) : 'Loading...'}
      </p>
      {priceChangePercentage !== null && (
        <p className="price-change" style={{ alignItems: 'center', fontSize: '0.7rem', margin: '0' }}>
          {priceChangePercentage > 0 ? '▲' : '▼'} ({priceChangePercentage.toFixed(2)}%)
        </p>
      )}
    </div>
  );
  
  
};

export default LivePrice;

