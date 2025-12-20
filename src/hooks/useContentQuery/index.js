import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';

const useContentQuery = () => {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const response = await axiosInstance.get(API_END_POINT.content.getAll);
      return response.data.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour - site content rarely changes
    onError: handleError
  });
};
export default useContentQuery;
