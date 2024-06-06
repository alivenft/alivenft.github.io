// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BitcoinPriceTracker from './components/BitcoinPriceTracker';
import Hero from './components/Hero';

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <main className="container mt-5">
        <BitcoinPriceTracker />
      </main>
      <Footer />
    </>
  );
};

export default App;
