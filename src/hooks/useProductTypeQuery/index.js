import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';
import data from '../../constants/content';

const useProductTypeQuery = (brandName, type) => {
  return useQuery({
    queryKey: ['productType', brandName, type],
    queryFn: async () => {
    //   const response = await axiosInstance.get(API_END_POINT.content.getAll); 
    //   return response.data;
    console.log("Fetching product type data for", brandName, type);
    console.log("Using local content data");
    console.log("Data:", data.brands[brandName]['products']);
    return data.brands[brandName]['products'][type];
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError
  });
};
export default useProductTypeQuery;