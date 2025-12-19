import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/spare-parts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['spare-parts']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Spare part created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create spare part');
    }
  });
};

export const useUpdateSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/spare-parts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['spare-parts']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Spare part updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update spare part');
    }
  });
};

export const useDeleteSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/spare-parts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['spare-parts']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Spare part deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete spare part');
    }
  });
};
