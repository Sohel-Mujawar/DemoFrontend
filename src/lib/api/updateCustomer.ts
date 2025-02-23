import {EditEmails, UpdateCustomerData} from '@/types';
import {api} from '@/utils/axios';

export const updateCustomer = async (id: string, data: UpdateCustomerData) => {
  try {
    const response = await api.post(`auth/customer/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data.message || error.message);
  }
};

export const updateCustomerEmail = async (data: EditEmails) => {
  try {
    const response = await api.put(`/admin/emailChange`, data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data.message || error.message);
  }
};

export const getAllEmails = async () => {
  try {
    const response = await api.get('/admin/emails');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAllEPins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
