import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';

const useProductTypeQuery = (brandName, type) => {
  return useQuery({
    queryKey: ['productType', brandName, type],
    queryFn: async () => {
      const response = await axiosInstance.get(API_END_POINT.content.getAll); 
      return response.data;
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};
export default useProductTypeQuery;