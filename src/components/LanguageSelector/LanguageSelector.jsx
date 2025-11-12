import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'sv', name: 'Svenska', flag: '/images/flags/SE.png' },
    { code: 'en', name: 'English', flag: '/images/flags/GB.png' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    console.log('Current language:', language);
  }, [language]);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-selector-text language-selector-text-current">{currentLanguage.name}</span>
        <img 
          src={currentLanguage.flag} 
          alt={currentLanguage.name}
          className="language-selector-flag"
        />
      </button>
      
      {isOpen && (
        <div className="language-selector-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-selector-option ${
                language === lang.code ? 'language-selector-option-active' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-selector-option-text">{lang.name}</span>

              <img 
                src={lang.flag} 
                alt={lang.name}
                className="language-selector-flag"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

