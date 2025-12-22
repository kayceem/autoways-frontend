import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useCSRHeroQuery = () => {
  return useQuery({
    queryKey: ['csr-hero'],
    queryFn: async () => {
      const response = await axiosInstance.get('/csr-hero');
      return response.data.data;
    },
    staleTime: 45 * 60 * 1000, // 45 minutes - CSR hero data rarely changes
    onError: handleError
  });
};

export default useCSRHeroQuery;
