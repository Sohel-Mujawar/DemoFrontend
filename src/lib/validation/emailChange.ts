import {z} from 'zod';

export const emailChangeSchema = z.object({
  crnNo: z
    .string({required_error: 'CRN No is required'})
    .min(5, {message: 'CRN No must be at least 5 characters'}),
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Email must be valid'}),
});
