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

export const ClientResponseSchema = z.object({
  clients: z.array(ProfileData),
});
export type ClientResponseSchemaType = z.infer<typeof ClientResponseSchema>;
