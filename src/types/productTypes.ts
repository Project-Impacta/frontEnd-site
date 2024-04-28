import { z } from 'zod';

export const Products = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.number().int(),
});

export type ProductsSchema = z.infer<typeof Products>;
