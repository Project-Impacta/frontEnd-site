import { z } from 'zod';

const shopCart = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.enum(['1', '2', '3']),
  quantity: z.number(),
});

export type ShopCartSchema = z.infer<typeof shopCart>;
