import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import BitcoinPriceTracker from './components/BitcoinPriceTracker';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
      <BitcoinPriceTracker />
      </main>
      <Footer />
    </>
  );
};

export default App;
