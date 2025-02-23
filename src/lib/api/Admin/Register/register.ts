import {api} from '@/utils/axios';

export const registerAdmin = async (adminData) => {
  try {
    const response = await api.post('/admin/register', adminData);
    return response.data;
  } catch (error) {
    const err = error; // Type assertion to ApiError
    console.error(
      'Error registering admin:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
