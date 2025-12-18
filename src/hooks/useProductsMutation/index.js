import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';
 
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create product');
    }
  });
};
 
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update product');
    }
  });
};
 
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Product deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete product');
    }
  });
};