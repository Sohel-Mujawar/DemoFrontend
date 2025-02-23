import {z} from 'zod';

export const shareLinkSchema = z.object({
  link: z.string().min(1, 'Link is required'),
  sponsorId: z
    .string({required_error: 'Sponsor ID is required'})
    .min(5, {message: 'Sponsor ID must be at least 5 characters'}),
  selfSide: z.string(),
});
