import axios from 'axios';
import config from '../../config';
import { transformAssetUrls } from '../../utils/assetUrl';

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
    // Automatically transform asset URLs in response data
    if (response.data) {
      response.data = transformAssetUrls(response.data);
    }
    return response;
  },
  (error) => {

    console.error('API Error:', error);
    return Promise.reject(error.response?.data || {
      message: 'An unknown error occurred',
    });
  }
);

export default axiosInstance;