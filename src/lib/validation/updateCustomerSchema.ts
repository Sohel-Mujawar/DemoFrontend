import {z} from 'zod';

export const updateCustomerSchema = z
  .object({
    crnNo: z
      .string({required_error: 'CRN No is required'})
      .min(5, {message: 'CRN No must be at least 5 characters'}),
    sponsorId: z
      .string({required_error: 'Sponsor ID is required'})
      .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
    firstName: z
      .string({required_error: 'First name is required'})
      .min(3, {message: 'First name must be at least 3 characters'}),
    lastName: z
      .string({required_error: 'Last name is required'})
      .min(3, {message: 'Last name must be at least 3 characters'}),
    gender: z.string({required_error: 'Gender is required'}).optional(),
    dob: z.string().optional(),
    email: z
      .string({required_error: 'Email is required'})
      .email({message: 'Email must be valid'}),
    phone: z
      .string({required_error: 'Mobile number is required'})
      .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number format')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits'),
    flatNo: z
      .string({message: 'Flat No is required'})
      .min(3, {message: 'Flat No must be at least 3 characters'})
      .optional(),
    areaName: z
      .string({message: 'Area is required'})
      .min(3, {message: 'Area must be at least 3 characters'})
      .optional(),
    landMark: z
      .string({message: 'Landmark is required'})
      .min(3, {message: 'Landmark must be at least 3 characters'})
      .optional(),
    pinCode: z
      .string()
      .regex(/^\d{6}$/g)
      .optional(),
    city: z
      .string({message: 'City is required'})
      .min(3, {message: 'City must be at least 3 characters'})
      .optional(),
    state: z
      .string({message: 'State is required'})
      .min(3, {message: 'State must be at least 3 characters'})
      .optional(),
    aadharNo: z
      .string({message: 'Aadhar No is required'})
      .regex(/^\d{12}$/g)
      .optional(),
    panNo: z
      .string({message: 'PAN No is required'})
      .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/g)
      .optional(),
    bankName: z
      .string({})
      .min(3, {message: 'Bank Name must be at least 3 characters'})
      .optional(),
    bankAccNo: z
      .string({message: 'Bank Account No is required'})
      .min(5, {message: 'Bank Account No must be at least 5 characters'})
      .optional(),
    bankIFSC: z
      .string()
      .regex(/^[A-Z]{4}0[0-9]{6}$/, 'Invalid IFSC code')
      .optional(),
    bankBranch: z
      .string({message: 'Bank Branch is required'})
      .min(3, {message: 'Bank Branch must be at least 3 characters'})
      .optional(),
    upiId: z
      .string({message: 'UPI Id is required'})
      .min(1, 'UPI Id is required')
      .regex(/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/g)
      .optional(),
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
