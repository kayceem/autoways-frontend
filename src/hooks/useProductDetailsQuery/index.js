import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import API_END_POINT from '../../constants/api/apiUrl';
import handleError from '../../utils/handleError';
import data from '../../constants/content';

const useProductDetailsQuery = (brandName, type, productId) => {
  return useQuery({
    queryKey: ['productDetails', brandName, type, productId],
    queryFn: async () => {
    //   const response = await axiosInstance.get(API_END_POINT.product.getById(productId));
    //   return response.data;
    console.log("Fetching product details for", brandName, type, productId);
    console.log("Using local content data");

    // Get all products of the specified type for the brand
    const products = data.brands[brandName]?.products?.[type];

    if (!products) {
      throw new Error('Products not found');
    }

    // Find the specific product by ID
    const product = products.find(p => p.id === productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
    },
    retry: 1,
    retryDelay: 2000,
    onError: handleError,
    enabled: !!brandName && !!type && !!productId // Only run query if all params are present
  });
};

export default useProductDetailsQuery;
