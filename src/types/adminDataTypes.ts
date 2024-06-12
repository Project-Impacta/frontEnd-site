import z from 'zod';

export const AdminDataProfile = z.object({
  data: z.string().optional(),
  cpf: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});
export type AdminDataProfileSchema = z.infer<typeof AdminDataProfile>;

export const AdminResponseSchema = z.object({
  data: z.array(AdminDataProfile),
});
export type AdminResponseSchemaType = z.infer<typeof AdminResponseSchema>;
