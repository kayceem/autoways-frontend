import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import handleError from '../../utils/handleError';

const useClientsQuery = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await axiosInstance.get('/clients');
      return response.data.data;
    },
    staleTime: 45 * 60 * 1000,
    onError: handleError
  });
};

export default useClientsQuery;
