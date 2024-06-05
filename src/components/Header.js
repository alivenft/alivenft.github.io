import React from 'react';
import btcLogo from './btc-logo.png';
import bitcointalkLogo from './bitcointalk.png';
import githubLogo from './github.png';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={btcLogo} alt="BTC Logo" width="30" height="30" className="me-2" />
          <span className="fs-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Crypto Price Tracker</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/alivenft/alivenft.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubLogo} alt="GitHub Logo" width="30" height="30" />
                <span className="ms-1">GitHub</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://bitcointalk.org/index.php?action=profile;u=3383579"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={bitcointalkLogo} alt="Bitcointalk Logo" width="30" height="30" />
                <span className="ms-1">Bitcointalk</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
