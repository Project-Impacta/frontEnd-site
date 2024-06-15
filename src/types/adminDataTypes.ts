import { validateEmail } from '@/utils/form-utils';
import z from 'zod';

export const AdminDataProfile = z.object({
  data: z.string().optional(),
  cpf: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().refine(validateEmail, {
    message: 'O e-mail deve conter a seguinte estrutura: example@example.com',
  }),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .optional(),
});
export type AdminDataProfileSchema = z.infer<typeof AdminDataProfile>;

export const AdminResponseSchema = z.object({
  data: z.array(AdminDataProfile),
});
export type AdminResponseSchemaType = z.infer<typeof AdminResponseSchema>;
