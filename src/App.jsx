import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './AppRoutes.jsx';

const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/terms';

  return (
    <div className="app">
      <div className="app-background"></div>
      <Navigation />
      <AppRoutes />
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
