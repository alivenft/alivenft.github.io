// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BitcoinPriceTracker from './components/BitcoinPriceTracker';
import Hero from './components/Hero';

const App = () => {
  return (
    <Router>
      <Header />
      <Hero />
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<BitcoinPriceTracker />} />
          <Route path="/:cryptoId" element={<BitcoinPriceTracker />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
