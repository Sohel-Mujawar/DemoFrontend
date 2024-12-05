import {AdminHomeResponse, ApiError, CustomerListResponse} from '@/types';
import {api} from '@/utils/axios';

// Fetch admin dashboard data
export const fetchAdminHome = async (): Promise<AdminHomeResponse> => {
  try {
    const response = await api.get<AdminHomeResponse>('/admin/home');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching admin home data:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Fetch customer list data
export const fetchCustomerList = async (): Promise<CustomerListResponse> => {
  try {
    const response = await api.get<CustomerListResponse>('/admin/customers');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error fetching customer list:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
