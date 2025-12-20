import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useBrandsQuery = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await axiosInstance.get('/brands');
      return response.data.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - brands rarely change
    onError: handleError
  });
};

export default useBrandsQuery;
