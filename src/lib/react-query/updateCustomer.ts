import {
  Customer,
  ApiError,
  UpdateCustomerData,
  GetAllEPinsResponse,
  EditEmails,
} from '@/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getAllEmails,
  updateCustomer,
  updateCustomerEmail,
} from '../api/updateCustomer';
import {ADMIN_EPIN_QUERY_KEYS, CUSTOMER_QUERY_KEYS} from './QueryKeys';
import {getAllEPins} from '../api/Admin/Epin/epin';

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: {id: string; data: UpdateCustomerData}) =>
      updateCustomer(id, data),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useUpdateCustomerEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data}: {data: EditEmails}) => updateCustomerEmail(data),
    onSuccess: () => {
      // console.log('Customer updated successfully:', res);
      queryClient.invalidateQueries({
        queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER],
      });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useGetAllEmails = () => {
  return useQuery({
    queryKey: ['GetAllEmails'],
    queryFn: getAllEmails,
  });
};
