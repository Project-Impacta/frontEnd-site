import { z } from 'zod';

export const FormData = z.object({
  firstName: z.coerce.string(),
  lastName: z.coerce.string(),
  phone: z.coerce.string(),
  cpf: z.coerce.string(),
  email: z.coerce.string(),
  password: z.coerce.string(),
  repeatPassword: z.coerce.string(),
});

export type FormDataSchema = z.infer<typeof FormData>;
export type FormErrors = z.infer<typeof FormData>;
