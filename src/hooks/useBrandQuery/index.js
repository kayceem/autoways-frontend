import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';
import data from '../../constants/content';

const useBrandQuery = (brandName) => {
  return useQuery({
    queryKey: ['brand', brandName],
    queryFn: async () => {
    //   const response = await axiosInstance.get(API_END_POINT.content.getAll); 
    //   return response.data;
    console.log("Using local content data");
    return data.brands[brandName];
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};
export default useBrandQuery;