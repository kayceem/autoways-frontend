import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';
import data from '../../constants/content';

const useContentQuery = () => {
  return useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
    //   const response = await axiosInstance.get(API_END_POINT.content.getAll); 
    //   return response.data;
    console.log("Using local content data");
    return data;
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};
export default useContentQuery;
