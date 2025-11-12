import { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const fetchTranslations = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(API_ENDPOINTS.translations, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error('Invalid translation data format');
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // Initialize as empty object, not a Promise
  const [allTranslations, setAllTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translations = allTranslations[language] || {};

  useEffect(() => {
    const hasAllLanguages = allTranslations.en && allTranslations.sv &&
      Object.keys(allTranslations.en).length > 0 &&
      Object.keys(allTranslations.sv).length > 0;

    if (hasAllLanguages) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchTranslations()
      .then((fetchedTranslations) => {
        setAllTranslations(fetchedTranslations);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message !== 'BACKEND_UNAVAILABLE') {
          console.error('Failed to load translations:', err);
          setError(err.message);
        } else {
          setError(null);
        }
        setLoading(false);
      });
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      translations, 
      allTranslations,
      loading, 
      error 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

