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
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};

export default useBrandsQuery;
