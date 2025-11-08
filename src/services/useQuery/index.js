import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../apiService/index';

export function useGet(url, queryKey, initialData) {
  return useQuery(
    queryKey,
    async () => {
      const { data } = await axiosInstance.get(url);
      return data;
    },
    {
      initialData,
    }
  );
}

export function usePost(url, onSuccess, onError) {
  return useMutation(
    async (requestData) => {
      const { data } = await axiosInstance.post(url, requestData);
      return data;
    },
    {
      onSuccess,
      onError,
    }
  );
}