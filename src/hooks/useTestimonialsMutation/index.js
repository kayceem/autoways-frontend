import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import toast from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post('/testimonials', formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Testimonial created successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.patch(`/testimonials/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Testimonial updated successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/testimonials/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
      queryClient.invalidateQueries(['site-content']);
      toast.success('Testimonial deleted successfully!');
    },
    onError: (error) => {
      handleError(error);
    }
  });
};
