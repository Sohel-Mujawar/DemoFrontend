import {z} from 'zod';

export const repurchaseProductSchema = z.object({
  crnNo: z
    .string({required_error: 'CRN No is required'})
    .min(5, {message: 'CRN No must be at least 5 characters'}),

  paidAmount: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {message: 'Count must be at least 1 and greater than 0'},
    )
    .transform((val) => Number(val)),
  imageFile: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: 'At least one file is required',
  }),
});
