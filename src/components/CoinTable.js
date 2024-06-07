import React, { useState } from 'react';
import './CoinTable.css'; // Ensure you create and link the CSS file
import SparklineChart from './SparklineChart'; // Import SparklineChart

const CoinTable = ({ cryptoList, setCrypto }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;

  const handleClick = (id) => {
    setCrypto(id);
    document.getElementById('crypto-details').scrollIntoView({ behavior: 'smooth' });
  };

  const totalPages = Math.ceil(cryptoList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptoList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating loading time
  };

  return (
    <div className="coin-table-container">
      <h2>List of Cryptocurrencies</h2>
      <table className="coin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>24h Chart</th>
            <th>Price</th>
            <th>24h</th>
            <th>24h Volume</th>
            <th>Market Cap</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="loading-indicator">Loading...</td>
            </tr>
          ) : (
            currentItems.map((crypto, index) => (
              <tr
                key={crypto.id}
                onClick={() => handleClick(crypto.id)}
                className={crypto.priceChangeClass}
              >
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <div className="coin-info">
                    <img
                      src={crypto.icon}
                      alt={`${crypto.name} icon`}
                      className="coin-icon"
                    />
                    <span>{crypto.name}</span>
                  </div>
                </td>
                <td>
                  <SparklineChart data={crypto.sparkline || []} />
                </td>
                <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                <td className={crypto.changePercent24Hr > 0 ? 'positive-change' : 'negative-change'}>
                  {crypto.changePercent24Hr ? `${crypto.changePercent24Hr.toFixed(2)}%` : 'N/A'}
                </td>
                <td>${parseFloat(crypto.volumeUsd24Hr).toFixed(2)}</td>
                <td>${parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
                <td>
                  <button className="buy-button">Buy</button>
                </td>
              </tr>
            ))
          )}
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
