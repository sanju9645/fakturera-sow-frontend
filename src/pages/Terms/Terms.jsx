import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const t = translations || {};

  const termsContent = t.terms?.content || '';

  // Format the content: convert \n to paragraphs and render HTML
  const formatContent = (content) => {
    if (!content) return '';
    
    // Handle both actual newlines and \n escape sequences
    // First replace literal \n strings with actual newlines
    let processedContent = content.replace(/\\n/g, '\n');
    
    // Split by newlines and create paragraphs
    const paragraphs = processedContent.split('\n').filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.trim() }} />
    ));
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="terms-page-wrapper">
      <h1 className="terms-title">{t.terms?.title || 'Terms'}</h1>

      <div className="close-button-wrapper">
        <button onClick={handleClose} className="close-and-go-back-button">
          {t.terms?.closeButton || 'Close and Go Back'}
        </button>
      </div>

      <div className="terms-container">
        <div className="terms-content">
          <div className="terms-text">
            {formatContent(termsContent)}
          </div>
        </div>
      </div>

      <div className="close-button-wrapper close-button-bottom">
        <button onClick={handleClose} className="close-and-go-back-button">
          {t.terms?.closeButton || 'Close and Go Back'}
        </button>
      </div>
    </div>
  );
};

export default Terms;

