import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <span className="footer-text">123 Fakturera</span>
        </div>

        <div className="footer-right">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">Order</a>
          <a href="#" className="footer-link">Contact Us</a>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-center">
        <span className="footer-text">© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;