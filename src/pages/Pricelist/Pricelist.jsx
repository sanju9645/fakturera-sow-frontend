import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import './Pricelist.css';

const Pricelist = () => {
  const { isAuthenticated, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [pricelist, setPricelist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch pricelist data
    const fetchPricelist = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        };

        const response = await fetch(API_ENDPOINTS.pricelist, {
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            logout();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch pricelist');
        }

        const result = await response.json();
        if (result.success) {
          setPricelist(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch pricelist');
        }
      } catch (err) {
        console.error('Error fetching pricelist:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPricelist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="pricelist-container">
        <div className="pricelist-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pricelist-container">
        <div className="pricelist-content">
          <p className="pricelist-error">Error: {error}</p>
          <button onClick={handleLogout} className="pricelist-logout">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pricelist-container">
      <div className="pricelist-content">
        <div className="pricelist-header">
          <h1 className="pricelist-title">Pricelist</h1>
          <button onClick={handleLogout} className="pricelist-logout">
            Logout
          </button>
        </div>
        <div className="pricelist-text">
          <p>Welcome to the pricelist page. This is a protected route that requires authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricelist;

