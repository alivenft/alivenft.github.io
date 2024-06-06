import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoinTable.css'; // Ensure you create and link the CSS file

const CoinTable = ({ cryptoList, setCrypto }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [liveCryptoList, setLiveCryptoList] = useState(cryptoList);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const updatedList = response.data.data.map((crypto) => ({
          ...crypto,
          changePercent24Hr: parseFloat(crypto.changePercent24Hr),
          icon: `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`,
        }));
        setLiveCryptoList((prevList) =>
          prevList.map((prevCrypto) => {
            const updatedCrypto = updatedList.find((c) => c.id === prevCrypto.id);
            if (updatedCrypto) {
              const priceChangeClass =
                updatedCrypto.priceUsd > prevCrypto.priceUsd
                  ? 'price-up'
                  : updatedCrypto.priceUsd < prevCrypto.priceUsd
                  ? 'price-down'
                  : '';
              return { ...prevCrypto, ...updatedCrypto, priceChangeClass };
            }
            return prevCrypto;
          })
        );
      } catch (error) {
        console.error('Error fetching live crypto data:', error);
      }
    };

    // Polling every 10 seconds
    const intervalId = setInterval(fetchLiveData, 10000);
    fetchLiveData();

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (id) => {
    setCrypto(id);
  };

  const totalPages = Math.ceil(liveCryptoList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = liveCryptoList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="coin-table-container">
      <table className="coin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>24h Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((crypto, index) => (
            <tr
              key={crypto.id}
              onClick={() => handleClick(crypto.id)}
              className={crypto.priceChangeClass}
            >
              <td>{indexOfFirstItem + index + 1}</td>
              <td>
                <img
                  src={crypto.icon}
                  alt={`${crypto.name} icon`}
                  style={{ width: '20px', marginRight: '10px' }}
                />
                {crypto.name}
              </td>
              <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
              <td className={crypto.changePercent24Hr > 0 ? 'positive-change' : 'negative-change'}>
                {crypto.changePercent24Hr ? `${crypto.changePercent24Hr.toFixed(2)}%` : 'N/A'}
              </td>
              <td>${parseFloat(crypto.volumeUsd24Hr).toFixed(2)}</td>
              <td>${parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinTable;
