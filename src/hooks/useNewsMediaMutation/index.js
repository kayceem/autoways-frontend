import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post('/news-articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['news-articles']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('News article created successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to create news article');
    }
  });
};

export const useUpdateNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/news-articles/${id}`, data, {
        headers: data instanceof FormData ? {
          'Content-Type': 'multipart/form-data',
        } : undefined,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['news-articles']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('News article updated successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to update news article');
    }
  });
};

export const useDeleteNewsArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/news-articles/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['news-articles']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('News article deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
      toast.error(error.response?.data?.error || 'Failed to delete news article');
    }
  });
};
