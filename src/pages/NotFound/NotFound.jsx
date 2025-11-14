import { useLanguage } from '../../context/LanguageContext';
import './NotFound.css';

const NotFound = () => {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">{t.notfound?.pageNotFoundError || 'Oops! Page not found'}</p>
        <a href="/" className="not-found-button">
          {t.notfound?.returnToHome || 'Return to Home'}
        </a>
      </div>
    </div>
  );
};

export default NotFound;