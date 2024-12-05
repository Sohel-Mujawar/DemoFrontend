import {
  AdminRegistrationInput,
  AdminRegistrationResponse,
  ApiError,
} from '@/types';
import {api} from '@/utils/axios';

export const registerAdmin = async (
  adminData: AdminRegistrationInput,
): Promise<AdminRegistrationResponse> => {
  try {
    const response = await api.post<AdminRegistrationResponse>(
      '/admin/register',
      adminData,
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as ApiError; // Type assertion to ApiError
    console.error(
      'Error registering admin:',
      err.response?.data.message || err.message,
    );
    throw err.response?.data || err;
  }
};
