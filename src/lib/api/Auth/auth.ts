import {CustomerRegistrationPayload, UserAuthenticationResponse} from '@/types';
import {api, unAuthenticatedApi} from '@/utils/axios';

// Register a new customer
export const registerCustomer = async (
  payload: CustomerRegistrationPayload,
) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

// Login a user
export const loginCustomer = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await unAuthenticatedApi.post('/auth/login', credentials);
  return response.data;
};
