import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateCSRHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/csr-hero', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-hero']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR Hero created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create CSR Hero');
    }
  });
};

export const useUpdateCSRHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/csr-hero/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-hero']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR Hero updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update CSR Hero');
    }
  });
};

export const useDeleteCSRHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/csr-hero/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-hero']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR Hero deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete CSR Hero');
    }
  });
};
