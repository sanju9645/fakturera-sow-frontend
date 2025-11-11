import './Navigation.css'

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button 
            className="navbar-hamburger"
            aria-label="Toggle menu"
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
        </div>
      </nav>
    </>
  );
};

export default Navigation;