import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

import './Navigation.css';

const Navigation = () => {
  const { translations } = useLanguage();
  const t = translations;
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
          <a href="#" className="navbar-link">{t.nav?.home || 'Home'}</a>
          <a href="#" className="navbar-link">{t.nav?.order || 'Order'}</a>
          <a href="#" className="navbar-link">{t.nav?.ourCustomers || 'Our Customers'}</a>
          <a href="#" className="navbar-link">{t.nav?.aboutUs || 'About us'}</a>
          <a href="#" className="navbar-link">{t.nav?.contactUs || 'Contact Us'}</a>

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
            {t.nav?.home || 'Home'}
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            {t.nav?.order || 'Order'}
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            {t.nav?.ourCustomers || 'Our Customers'}
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            {t.nav?.aboutUs || 'About us'}
          </a>
          <a href="#" className="mobile-menu-link" onClick={closeMenu}>
            {t.nav?.contactUs || 'Contact Us'}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;