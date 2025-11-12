import { useLanguage } from '../../context/LanguageContext.jsx';
import './Footer.css';

const Footer = () => {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <span className="footer-text footer-text-left">123 Fakturera</span>
        </div>

        <div className="footer-right">
          <a href="#" className="footer-link">{t.nav?.home || 'Home'}</a>
          <a href="#" className="footer-link">{t.nav?.order || 'Order'}</a>
          <a href="#" className="footer-link">{t.nav?.contactUs || 'Contact Us'}</a>
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