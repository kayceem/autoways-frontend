import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useSparepartsQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['spare-parts', filters],
    queryFn: async () => {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.inStock) params.inStock = filters.inStock;

      const response = await axiosInstance.get('/spare-parts', { params });
      return response.data.data;
    },
    staleTime: 45 * 60 * 1000, // 45 minutes - spare parts rarely change
    onError: handleError
  });
};

export default useSparepartsQuery;
