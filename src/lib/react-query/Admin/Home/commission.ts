import {
  fetchAdminCommission,
  getAdminPaidCommission,
  getProductSales,
  payCommission,
  payCommissionAll,
} from '@/lib/api/Admin/Home/commission';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ADMIN_DASHBOARD_QUERY_KEYS} from '../../QueryKeys';

export const useFetchAdminCommsion = () => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_COMMISSION],
    queryFn: fetchAdminCommission,
  });
};

export const useGetAdminPaidCommission = () => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_COMMISSION],
    queryFn: getAdminPaidCommission,
  });
};

export const usePayCommission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => payCommission(id),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to pay commission:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_COMMISSION],
      });
    },
  });
};

export const usePayCommissionAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => payCommissionAll(),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Failed to pay commission:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_COMMISSION],
      });
    },
  });
};

export const useGetProductSalesReport = () => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.PRODUCT_SALES_REPORT],
    queryFn: () => getProductSales(),
  });
};
