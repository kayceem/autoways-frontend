import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';

export const useGalleryQuery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await axiosInstance.get('/gallery');
      return response.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
