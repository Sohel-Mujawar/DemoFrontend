import {
  ApiError,
  CreateEPinRequest,
  CreateEPinResponse,
  GetAllEPinsResponse,
  RejectEpinRequestResponse,
} from '@/types';
import {api} from '@/utils/axios';

// Create E-Pins
export const createEPin = async (
  id: string,
  payload: CreateEPinRequest,
): Promise<CreateEPinResponse> => {
  try {
    const response = await api.post<CreateEPinResponse>(
      `/admin/create-epin/${id}`,
      payload,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error in createEPin:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Fetch all E-Pins
export const getAllEPins = async (): Promise<GetAllEPinsResponse> => {
  try {
    const response = await api.get<GetAllEPinsResponse>('/admin/get-all-epins');
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error in getAllEPins:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};

// Reject E-Pin Request
export const rejectEpinRequest = async (
  id: string,
): Promise<RejectEpinRequestResponse> => {
  try {
    const response = await api.post<RejectEpinRequestResponse>(
      `/admin/reject-epin/${id}`,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error in rejectEpinRequest:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
