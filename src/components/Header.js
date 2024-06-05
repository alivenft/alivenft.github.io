import React from 'react';
import { FaGithub } from 'react-icons/fa';
import btcLogo from './btc-logo.png'; // Ensure you have a BTC logo image in your project

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="#">
        <img src={btcLogo} alt="BTC Logo" width="30" height="30" />
        BTC Tracker
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <FaGithub size="1.5em" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
