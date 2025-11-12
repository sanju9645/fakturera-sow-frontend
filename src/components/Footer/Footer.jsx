import { useLanguage } from '../../context/LanguageContext.jsx';
import { translations } from '../../config/translations.js';
import './Footer.css';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <span className="footer-text footer-text-left">123 Fakturera</span>
        </div>

        <div className="footer-right">
          <a href="#" className="footer-link">{t.nav.home}</a>
          <a href="#" className="footer-link">{t.nav.order}</a>
          <a href="#" className="footer-link">{t.nav.contactUs}</a>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-center">
        <span className="footer-text footer-text-center">© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;