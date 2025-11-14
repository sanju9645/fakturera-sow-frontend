/**
 * API Configuration
 * Centralized API base URL and endpoints
 */

const PORT = import.meta.env.VITE_BACKEND_PORT || 8000;
const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL || `http://localhost:${PORT}`;

export const API_ENDPOINTS = {
  translations: `${API_BASE_URL}/api/translations`,
  health: `${API_BASE_URL}/health`,
  login: `${API_BASE_URL}/api/auth/login`,
};

export default API_BASE_URL;
