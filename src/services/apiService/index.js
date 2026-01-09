import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      // Return config even if token retrieval fails 
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject({
      message: 'Failed to configure request',
      originalError: error,
    });
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      const isAdmin = localStorage.getItem('isAdmin');

      if (isAdmin) {
        // Clear admin session
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isAdmin');

        // Redirect to admin login
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login';
        }
      }
    }

    console.error('API Error:', error);
    return Promise.reject(error.response?.data || {
      message: 'An unknown error occurred',
    });
  }
);

export default axiosInstance;