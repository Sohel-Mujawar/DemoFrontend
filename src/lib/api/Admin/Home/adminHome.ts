import {AdminHomeResponse, ApiError, CustomerListResponse} from '@/types';
import {api} from '@/utils/axios';

// Fetch admin dashboard data
export const fetchAdminHome = async () => {
  try {
    const response = await api.get('/admin/home');
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
export const fetchCustomerList = async () => {
  try {
    const response = await api.get('/admin/customers');
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
