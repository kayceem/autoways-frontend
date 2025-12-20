import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useSisterCompaniesQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['sister-companies'],
    queryFn: async () => {
      const response = await axiosInstance.get('/sister-companies');
      return response.data.data;
    },
    staleTime: 45 * 60 * 1000, // 45 minutes - sister companies rarely change
    onError: handleError
  });
};

export default useSisterCompaniesQuery;
