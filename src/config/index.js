const apiBaseUrl = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5000/api';

// Derive backend base URL by removing /api suffix if present
const backendBaseUrl = apiBaseUrl.replace(/\/api\/?$/, '');

const config = {
    baseUrl: apiBaseUrl,
    assetsBaseUrl: backendBaseUrl,
  };


export default config;
  