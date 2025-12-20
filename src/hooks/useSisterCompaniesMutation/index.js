import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateSisterCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/sister-companies', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sister-companies']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Sister company created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create sister company');
    }
  });
};

export const useUpdateSisterCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/sister-companies/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sister-companies']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Sister company updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update sister company');
    }
  });
};

export const useDeleteSisterCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/sister-companies/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sister-companies']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Sister company deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete sister company');
    }
  });
};
