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
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};
 
export default useProductsQuery;