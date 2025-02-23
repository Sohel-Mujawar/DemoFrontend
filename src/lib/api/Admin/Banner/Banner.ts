import {api} from '@/utils/axios';

export const getBanners = async () => {
  try {
    const response = await api.get('/admin/banner');
    return response.data;
  } catch (error) {
    console.error(
      'Error in getBanners:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const createBanner = async (data: {title: string; imageFile: File}) => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('imageFile', data.imageFile);

    const response = await api.post('/admin/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error in createBanner:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
export const updateBanner = async (data: {
  id: string;
  title: string;
  imageFile: File;
}) => {
  try {
    const response = await api.patch(`/admin/banner/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      'Error in updateBanner:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};

export const deleteBanner = async (id: string) => {
  try {
    const response = await api.delete(`/admin/banner/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error in deleteBanner:',
      error.response?.data.message || error.message,
    );
    throw error;
  }
};
