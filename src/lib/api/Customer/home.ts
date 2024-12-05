import {Customer, Commission, EpinRequestPayload, EpinResponse} from '@/types';
import {api} from '@/utils/axios';

// Fetch customer details
export const getCustomer = async (id: string): Promise<Customer> => {
  const response = await api.get<Customer>(`/customer/home/${id}`);
  return response.data;
};

// Fetch customer commissions
export const getCommission = async (id: string): Promise<Commission[]> => {
  const response = await api.get<Commission[]>(`/customer/commission/${id}`);
  return response.data;
};
