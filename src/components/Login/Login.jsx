import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import ShowPasswordIcon from '../../../public/icons/show_password.png';
import HidePasswordIcon from '../../../public/icons/hide_password.png';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { translations } = useLanguage();
  const t = translations;
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };
    let isValid = true;

    // Email validation
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email =  t.login?.invalidEmailError || 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t.login?.invalidPasswordError || 'This field cannot be empty';
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = t.login?.passwordMinLengthError || 'This field must be at least 4 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({ email: '', password: '' });

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/pricelist');
    } else {
      if (result.error === 'The user does not exist') {
        setErrors({
          email: t.login?.userNotFoundError || 'The user does not exist',
          password: ''
        });
      } else if (result.error === 'Invalid email or password') {
        setErrors({
          password: 'Invalid email or password',
          email: ''
        });
      } else {
        setErrors({
          password: result.error || 'Login failed',
          email: ''
        });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form-title">{t.login?.title || 'Log in'}</h1>
        
        <div className="login-form-field">
          <label htmlFor="email" className="login-form-label">
            {t.login?.emailLabel || 'Enter your email address'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`login-form-input ${errors.email ? 'login-form-input-error' : ''}`}
            placeholder={t.login?.emailPlaceholder || 'Email address'}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="login-form-error">{errors.email}</div>
          )}
        </div>

        <div className="login-form-field">
          <label htmlFor="password" className="login-form-label">
            {t.login?.passwordLabel || 'Enter your password'}
          </label>
          <div className="login-form-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`login-form-input ${errors.password ? 'login-form-input-error' : ''}`}
              placeholder={t.login?.passwordPlaceholder || 'Password'}
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
          {errors.password && (
            <div className="login-form-error">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="login-form-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : (t?.login?.button || 'Log in')}
        </button>

        <div className="login-form-links">
          <a href="#" className="login-form-link">
            {t.login?.register || 'Register'}
          </a>
          <a href="#" className="login-form-link">
            {t.login?.forgottenPassword || 'Forgotten password?'}
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
