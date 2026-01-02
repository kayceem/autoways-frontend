import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/customers/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['site-content']);
      toast.success('Customer deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
