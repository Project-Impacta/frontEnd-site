import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  FRONTEND_ORIGIN: z.string(),
  FRONTEND_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
