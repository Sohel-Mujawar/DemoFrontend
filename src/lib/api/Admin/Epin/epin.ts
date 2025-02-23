import {api} from '@/utils/axios';

// Create E-Pins
export const createEPin = async (epincount: number) => {
  try {
    const response = await api.post(`admin/epin/create-self/${epincount}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in createEPin:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

// Fetch all E-Pins
export const getAllEPins = async () => {
  try {
    const response = await api.get('/admin/epin/adminPins');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAllEPins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getAdminEpins = async () => {
  try {
    const response = await api.get('/admin/epin/adminPins');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getAdminEpins:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getCustomerEpins = async () => {
  try {
    const response = await api.get(`/admin/epin/customers`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in getCustomerEpin:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getEpinRequest = async () => {
  try {
    const response = await api.get('/admin/epin/requests');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const ApproveEpinRequest = async (
  id: string,
  data: {epincount: number},
) => {
  try {
    const response = await api.post(`admin/epin/create/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in ApproveEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
// Reject E-Pin Request
export const rejectEpinRequest = async (id: string) => {
  try {
    const response = await api.post(`/admin/epin/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in rejectEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const EpinHistory = async () => {
  try {
    const response = await api.get(`/admin/epin/old-requests`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in EpinHistory:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
