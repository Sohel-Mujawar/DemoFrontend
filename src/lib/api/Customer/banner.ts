import {api} from '@/utils/axios';

export const getBanners = async () => {
  try {
    const response = await api.get('/customer/banner');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getBanners:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
