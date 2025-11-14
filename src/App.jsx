import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Pricelist from './pages/Pricelist/Pricelist.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to pricelist if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/pricelist" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <LanguageProvider>
      <div className="app">
        <div className="app-background"></div>
        <Navigation />
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/pricelist" 
            element={
              <ProtectedRoute>
                <Pricelist />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
