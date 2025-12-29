import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';
import siteData from '../../config/siteData';

const useContentQuery = () => {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(API_END_POINT.content.getAll);
        return response.data.data;
      } catch (error) {
        console.warn('Backend not available, using local site data');
        handleError(error);
        return siteData;
      }
    },
    staleTime: 60 * 60 * 1000,
    retry: 1, // Only retry once before falling back
  });
};
export default useContentQuery;
