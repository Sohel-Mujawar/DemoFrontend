import {ApiError, EpinResponse} from '@/types';
import {api} from '@/utils/axios';

// Create an E-Pin request
import axios from 'axios';

export const createEpinRequest = async (
  id: string,
  paidAmount: number,
  imageFile: File,
) => {
  try {
    // Prepare the form data
    const formData = new FormData();
    formData.append('paidAmount', String(paidAmount));
    formData.append('imageFile', imageFile);

    // Send the POST request with form data
    const response = await api.post<EpinResponse>(
      `customer/epinRequest/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error creating E-Pin request:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

// Fetch E-Pin requests by user ID
export const getEpinRequests = async (id: string) => {
  try {
    const response = await api.get(`/customer/epin/requests/${id}`);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching E-Pin requests:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};

export const getEpins = async (id: string) => {
  try {
    const response = await api.get(`/customer/epins/${id}`);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    console.error(
      'Error fetching E-Pin requests:',
      apiError.response?.data.message || apiError.message,
    );
    throw apiError.response?.data || apiError;
  }
};
