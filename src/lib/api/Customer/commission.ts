import {api} from '@/utils/axios';

// Fetch customer details by ID
export const getCustomer = async (id) => {
  try {
    const {data} = await api.get(`/customer/home/${id}`);
    return data;
  } catch (error) {
    const {response} = error;
    console.error(
      'Error fetching customer:',
      response?.data.message || error.message,
    );
    throw error;
  }
};

// Fetch commissions by customer ID
export const getCommission = async (id) => {
  try {
    const {data} = await api.get(`/customer/commission/${id}`);
    return data;
  } catch (error) {
    const {response} = error;
    console.error(
      'Error fetching commissions:',
      response?.data.message || error.message,
    );
    throw error;
  }
};
