import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/product-types', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product-types']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product type created successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useUpdateProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch('/product-types', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product-types']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product type updated successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useDeleteProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.delete('/product-types', { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product-types']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product type deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
