import {registerAdmin} from '@/lib/api/Admin/Register/register';
import {
  AdminRegistrationResponse,
  AdminRegistrationInput,
  ApiError,
} from '@/types';
import {useMutation} from '@tanstack/react-query';

export const useRegisterAdmin = () => {
  return useMutation<
    AdminRegistrationResponse,
    ApiError,
    AdminRegistrationInput
  >({
    mutationFn: registerAdmin,
    onSuccess: (res) => {
      console.log('Admin registered successfully:', res);
    },
    onError: (error: ApiError) => {
      console.error(
        'Failed to register admin:',
        error.response?.data.message || error.message,
      );
    },
  });
};
