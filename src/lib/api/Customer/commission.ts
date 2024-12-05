import {Customer, Commission, ApiError} from '@/types';
import {api} from '@/utils/axios';

// Fetch customer details by ID
export const getCustomer = async (id: string): Promise<Customer> => {
  try {
    const response = await api.get<Customer>(`/customer/home/${id}`);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching customer:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

// Fetch commissions by customer ID
export const getCommission = async (id: string): Promise<Commission[]> => {
  try {
    const response = await api.get<Commission[]>(`/customer/commission/${id}`);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching commissions:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};
