import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/apiService/index';
import { toast } from 'react-hot-toast';
import handleError from '../../utils/handleError';

export const useLogFilesQuery = () => {
  return useQuery({
    queryKey: ['logs', 'files'],
    queryFn: async () => {
      const response = await axiosInstance.get('/logs/files');
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useLogsQuery = (params = {}) => {
  const { file, level, search, limit = 100, offset = 0, startDate, endDate } = params;

  return useQuery({
    queryKey: ['logs', 'entries', { file, level, search, limit, offset, startDate, endDate }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (file) queryParams.append('file', file);
      if (level) queryParams.append('level', level);
      if (search) queryParams.append('search', search);
      if (limit) queryParams.append('limit', limit.toString());
      if (offset) queryParams.append('offset', offset.toString());
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await axiosInstance.get(`/logs?${queryParams.toString()}`);
      return response.data;
    },
    staleTime: 10 * 1000, // 10 seconds
    keepPreviousData: true,
  });
};

export const useLogStatsQuery = () => {
  return useQuery({
    queryKey: ['logs', 'stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/logs/stats');
      return response.data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useClearLogsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (daysToKeep = 7) => {
      const response = await axiosInstance.post('/logs/clear', { daysToKeep });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['logs']);
      toast.success(data.message || 'Logs cleared successfully');
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
