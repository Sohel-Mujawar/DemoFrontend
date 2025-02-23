import {z} from 'zod';

export const customerListSchema = z.object({
  sponsorId: z
    .string()
    .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
});
