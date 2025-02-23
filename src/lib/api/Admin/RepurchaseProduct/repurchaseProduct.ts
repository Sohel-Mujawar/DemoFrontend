import {api} from '@/utils/axios';

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

export const getRepurchaseRequest = async () => {
  try {
    const response = await api.get('/admin/repurchase');
    // console.log('response::', response.data);

    return response.data;
  } catch (error) {
    console.error(
      'Error in getEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const getRepurchase = async () => {
  try {
    const response = await api.get('/admin/repurchase/all');

    return response.data;
  } catch (error) {
    console.error(
      'Error in getEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const rejectRepurchaseRequest = async (id: string) => {
  try {
    const response = await api.post(`/admin/repurchase/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in rejectEpinRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const ApproveRepurchaseRequest = async (id: string) => {
  try {
    const response = await api.post(`admin/repurchase/accept/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in ApproveRepurchaseRequest:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
