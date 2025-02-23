import {
  getCustomer,
  getCommission,
  getCustomerById,
  fetchCustomerHome,
} from '@/lib/api/Customer/home';
import {Customer, Commission} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {CUSTOMER_QUERY_KEYS} from '../QueryKeys';

// Fetch customer details
export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
    queryFn: () => getCustomer(id),
  });
};

// Fetch customer commissions
export const useGetCommission = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.COMMISSION],
    queryFn: () => getCommission(id),
  });
};

export const useGetCustomerById = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
    queryFn: () => getCustomerById(id),
  });
};

export const useFetchCustomerHome = (id: string) => {
  return useQuery({
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
    queryFn: () => fetchCustomerHome(id),
  });
};
