import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="navbar-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
            <span className="navbar-hamburger-line"></span>
          </button>
          <div className="navbar-logo">
            <img 
              src="/images/diamond.png" 
              alt="Logo" 
              className="navbar-logo-image"
            />
          </div>
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link">Home</a>
          <a href="#" className="navbar-link">Order</a>
          <a href="#" className="navbar-link">Our Customers</a>
          <a href="#" className="navbar-link">About Us</a>
          <a href="#" className="navbar-link">Contact Us</a>

          <div className="navbar-language navbar-language-desktop">
            <LanguageSelector />
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-language navbar-language-mobile">
            <LanguageSelector />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            Home
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            Order
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            Our Customers
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            About Us
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;