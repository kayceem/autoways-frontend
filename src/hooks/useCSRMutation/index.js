import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateCSRInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post('/csr-initiatives', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-initiatives']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR initiative created successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useUpdateCSRInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/csr-initiatives/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-initiatives']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR initiative updated successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useDeleteCSRInitiative = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/csr-initiatives/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csr-initiatives']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('CSR initiative deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
