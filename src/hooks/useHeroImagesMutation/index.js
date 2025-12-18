import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateHeroImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post('/hero-images', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hero-images']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Hero image created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create hero image');
    }
  });
};

export const useUpdateHeroImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/hero-images/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hero-images']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Hero image updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update hero image');
    }
  });
};

export const useDeleteHeroImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/hero-images/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hero-images']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Hero image deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete hero image');
    }
  });
};
