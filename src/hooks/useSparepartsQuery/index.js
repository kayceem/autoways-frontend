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
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};

export default useSparepartsQuery;
