import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/contact', data);
      return response.data;
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
