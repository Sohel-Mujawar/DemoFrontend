import {ApiError, EpinRequestPayload, EpinResponse} from '@/types';
import {api} from '@/utils/axios';

// Create an E-Pin request
export const createEpinRequest = async (
  id: string,
  payload: EpinRequestPayload,
): Promise<EpinResponse> => {
  try {
    const response = await api.post<EpinResponse>(
      `/customer/epin/${id}`,
      payload,
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
export const getEpinRequests = async (id: string): Promise<EpinResponse[]> => {
  try {
    const response = await api.get<EpinResponse[]>(
      `/customer/epin/requests/${id}`,
    );
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
