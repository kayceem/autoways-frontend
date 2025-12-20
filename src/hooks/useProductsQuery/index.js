import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';
 
const useProductsQuery = (filters = {}) => {
  return useQuery({
    queryKey: filters.brand ? ['products', filters.brand] : ['products'],
    queryFn: async () => {
      const params = {};
      if (filters.brand) params.brand = filters.brand;
      if (filters.category) params.category = filters.category;
      if (filters.type) params.type = filters.type;
        if (filters.id) params.id = filters.id;

      const response = await axiosInstance.get('/products', { params });
      return response.data.data;
    },
    staleTime: 45 * 60 * 1000, // 45 minutes - products rarely change
    onError: handleError
  });
};
 
export default useProductsQuery;