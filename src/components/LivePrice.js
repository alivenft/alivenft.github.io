import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LivePrice = ({ crypto }) => {
  const [price, setPrice] = useState(null);
  const [priceChangePercentage, setPriceChangePercentage] = useState(null);
  const [color, setColor] = useState(localStorage.getItem(`${crypto}PriceColor`) || '#39FF14');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${crypto}`);
        const newPrice = parseFloat(response.data.data.priceUsd);
        const newPriceChangePercentage = parseFloat(response.data.data.changePercent24Hr);

        setPrice(newPrice);
        setPriceChangePercentage(newPriceChangePercentage);

        const newColor = newPriceChangePercentage > 0 ? '#39FF14' : '#FF0000';
        setColor(newColor);
        localStorage.setItem(`${crypto}PriceColor`, newColor);
      } catch (error) {
        console.error('Error fetching live price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, [crypto]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div className="info-container text-center p-4 m-1" style={{ color, width: '100%', borderRadius: '10px', backgroundColor: '#1e2025' }}>
            <h2 className="mb-1">{crypto.toUpperCase()}</h2>
            <p className="display-6">${price !== null ? price.toFixed(2) : 'Loading...'}</p>
            {priceChangePercentage !== null && (
              <p className="mb-2">
                {priceChangePercentage > 0 ? '▲' : '▼'} ({priceChangePercentage.toFixed(2)}%)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePrice;
