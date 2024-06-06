// src/components/Hero.js
import React from 'react';
import iphoneRight from './header.png'; // Add path to your right iPhone image

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container text-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 d-flex justify-content-center">
            <img src={iphoneRight} alt="iPhone Right" className="img-fluid hero-image"/>
          </div>
          <div className="col-lg-6 hero-text-container">
            <h1 className="hero-title">Track your... ♡</h1>
            <p className="hero-subtitle">Start tracking cryptocurrency prices in real-time.</p>
            <button className="btn btn-primary start-tracking-btn">Start Tracking</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
