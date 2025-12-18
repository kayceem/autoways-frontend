import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useProductTypesQuery = (brandId = null) => {
  return useQuery({
    queryKey: brandId ? ['product-types', brandId] : ['product-types'],
    queryFn: async () => {
      const params = brandId ? { brandId } : {};
      const response = await axiosInstance.get('/product-types', { params });
      return response.data.data;
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};

export default useProductTypesQuery;
