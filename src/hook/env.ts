import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
  NEXT_PUBLIC_FRONTEND_ORIGIN: z.string(),
  NEXT_PUBLIC_FRONTEND_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
