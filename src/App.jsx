import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext.jsx';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <div className="app-background"></div>
        <Navigation />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App
