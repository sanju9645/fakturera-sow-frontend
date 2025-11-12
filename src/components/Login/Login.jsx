import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../config/translations';
import './Login.css';
import ShowPasswordIcon from '../../../public/icons/show_password.png';
import HidePasswordIcon from '../../../public/icons/hide_password.png';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // TODO: Implement login logic
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form-title">{t.login.title}</h1>
        
        <div className="login-form-field">
          <label htmlFor="email" className="login-form-label">
            {t.login.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-form-input"
            placeholder={t.login.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-form-field">
          <label htmlFor="password" className="login-form-label">
            {t.login.passwordLabel}
          </label>
          <div className="login-form-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="login-form-input"
              placeholder={t.login.passwordPlaceholder}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="login-form-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <img src={ShowPasswordIcon} className="login-form-password-toggle-icon" alt="Show password" /> : <img src={HidePasswordIcon} className="login-form-password-toggle-icon" alt="Hide password" />}
            </button>
          </div>
        </div>

        <button type="submit" className="login-form-submit">
          {t.login.button}
        </button>

        <div className="login-form-links">
          <a href="#" className="login-form-link">
            {t.login.register}
          </a>
          <a href="#" className="login-form-link">
            {t.login.forgottenPassword}
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

