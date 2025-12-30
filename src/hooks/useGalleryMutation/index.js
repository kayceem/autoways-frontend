import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post('/gallery', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Gallery image added successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/gallery/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Gallery image deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
