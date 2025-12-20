import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';

const useBrandQuery = (brandName) => {
  return useQuery({
    queryKey: ['brand', brandName],
    queryFn: async () => {
      const response = await axiosInstance.get(`${API_END_POINT.content.brand}${brandId}`);
      return response.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - brand data rarely changes
    onError: handleError
  });
};
export default useBrandQuery;