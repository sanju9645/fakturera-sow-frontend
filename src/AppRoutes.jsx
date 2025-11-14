import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './components/Login/Login';
import Pricelist from './pages/Pricelist/Pricelist.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Terms from './pages/Terms/Terms.jsx';

// Protected Route Component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to pricelist if already logged in)
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/pricelist" replace />;
};

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/pricelist" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/pricelist" element={<Pricelist />} />
      </Route>
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

