import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import Login from './components/Login/Login';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <div className="app-background"></div>
        <Navigation />
        <Login />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App
