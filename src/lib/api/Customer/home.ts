import {Customer, Commission, ApiError} from '@/types';
import {api} from '@/utils/axios';

// Fetch customer details
export const getCustomer = async (id: string) => {
  try {
    const response = await api.get(`/auth/customer/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching customer:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Fetch customer commissions
export const getCommission = async (id: string) => {
  try {
    const response = await api.get(`/customer/commission/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching commissions:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const response = await api.get(`/auth/customer/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching customer by ID:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const fetchCustomerHome = async (id: string) => {
  try {
    const response = await api.get(`/customer/home/${id}`);
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
