import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';

export const useCareersQuery = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const response = await axiosInstance.get('/careers');
      return response.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
