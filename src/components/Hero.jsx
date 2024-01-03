import React, { useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const wigsSectionRef = useRef();

  const handleShopNowClick = () => {
    if (wigsSectionRef.current) {
      window.scrollTo({
        top: wigsSectionRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="hero-section">
      <p className="hero-text">Wigs collection</p>
      <h2 className="hero-subtext">
        Get 20% discount of all wigs - limited time only
      </h2>
      <p className="hero-last-text">We have the best wig for you</p>
      <button className="hero-btn" onClick={handleShopNowClick}>
        Shop now
      </button>
      <div ref={wigsSectionRef}></div>
    </div>
  );
}
