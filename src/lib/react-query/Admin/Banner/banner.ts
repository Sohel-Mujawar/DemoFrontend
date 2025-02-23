import {
  getBanners,
  createBanner,
  deleteBanner,
  updateBanner,
} from '@/lib/api/Admin/Banner/Banner';
import {ADMIN_BANNERS_QUERY_KEYS} from '../../QueryKeys';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useGetAllBanners = () => {
  return useQuery({
    queryKey: [ADMIN_BANNERS_QUERY_KEYS.BANNERS],
    queryFn: getBanners,
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBanner,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to create banner:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_BANNERS_QUERY_KEYS.BANNERS],
      });
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to update banner:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_BANNERS_QUERY_KEYS.BANNERS],
      });
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to delete banner:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_BANNERS_QUERY_KEYS.BANNERS],
      });
    },
  });
};
