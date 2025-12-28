import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Store the token returned from backend
      const { token } = data;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('isAdmin', 'true');
      toast.success('Login successful!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
