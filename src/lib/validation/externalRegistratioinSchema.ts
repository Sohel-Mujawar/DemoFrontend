import {z} from 'zod';

export const externalRegistrationSchema = z
  .object({
    sponsorId: z
      .string({required_error: 'Sponsor ID is required'})
      .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
    selfSide: z.enum(['LEFT', 'RIGHT'], {
      errorMap: () => ({message: "Please select either 'LEFT' or 'RIGHT'."}),
    }),

    firstName: z
      .string({required_error: 'First name is required'})
      .min(3, {message: 'First name must be at least 3 characters'}),
    lastName: z
      .string({required_error: 'Last name is required'})
      .min(3, {message: 'Last name must be at least 3 characters'}),

    email: z
      .string({required_error: 'Email is required'})
      .email({message: 'Email must be valid'}),
    phone: z
      .string({required_error: 'Mobile number is required'})
      .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number format')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits'),
    aadharNo: z
      .string({required_error: 'Aadhar No is required'})
      .regex(/^\d{12}$/g)
      .optional(),
    panNo: z
      .string({required_error: 'PAN No is required'})
      .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/g)
      .optional(),
    bankName: z
      .string({required_error: 'Bank Name is required'})
      .min(3, {message: 'Bank Name must be at least 3 characters'}),
    bankAccNo: z
      .string({required_error: 'Bank Account No is required'})
      .min(5, {message: 'Bank Account No must be at least 5 characters'}),
    bankIFSC: z
      .string({required_error: 'IFSC Code is required'})
      .min(11, {message: 'IFSC Code must be exactly 11 characters'}),
    bankBranch: z
      .string({required_error: 'Bank Branch is required'})
      .min(3, {message: 'Bank Branch must be at least 3 characters'}),
    upiId: z
      .string({required_error: 'UPI Id is required'})
      .min(1, 'UPI Id is required')
      .regex(/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/g)
      .optional(),

    epinNo: z
      .string({required_error: 'E-Pin is required'})
      .min(4, {message: 'E-Pin must be at least 4 characters'}),
    password: z
      .string({required_error: 'Password is required'})
      .min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z
      .string({required_error: 'Confirm Password is required'})
      .min(6, {message: 'Confirm Password must be at least 6 characters'}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });
