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
    staleTime: 60 * 60 * 1000, // 1 hour - product types rarely change
    onError: handleError
  });
};

export default useProductTypesQuery;
