import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BitcoinPriceTracker from './components/BitcoinPriceTracker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="container mt-5">
        <BitcoinPriceTracker />
      </main>
      <Footer />
    </>
  );
};

export default App;
