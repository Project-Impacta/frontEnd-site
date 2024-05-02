import { z } from 'zod';

export const FormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
  repeatPassword: z.string(),
});

export type FormDataSchema = z.infer<typeof FormData>;
export type FormErrors = z.infer<typeof FormData>;
