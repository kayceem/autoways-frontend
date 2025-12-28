import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useRefreshCache = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/data/refresh');
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Cache refreshed successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
