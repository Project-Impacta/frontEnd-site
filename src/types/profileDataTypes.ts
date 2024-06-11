import z from 'zod';

export const ProfileData = z.object({
  data: z.string().optional(),
  cpf: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
});
export type ProfileDataSchema = z.infer<typeof ProfileData>;
