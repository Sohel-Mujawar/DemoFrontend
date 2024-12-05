import {
  fetchAdminHome,
  fetchCustomerList,
} from '@/lib/api/Admin/Home/adminHome';
import {AdminHomeResponse, CustomerListResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {ADMIN_DASHBOARD_QUERY_KEYS} from '../../QueryKeys';

export const useFetchAdminHome = () => {
  return useQuery<AdminHomeResponse>({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.ADMIN_HOME],
    queryFn: fetchAdminHome,
  });
};

// Hook to fetch customer list data
export const useFetchCustomerList = () => {
  return useQuery<CustomerListResponse>({
    queryKey: [ADMIN_DASHBOARD_QUERY_KEYS.CUSTOMER_LIST],
    queryFn: fetchCustomerList,
  });
};
