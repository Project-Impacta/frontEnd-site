import { z } from 'zod';

export const Products = z.object({
  _id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.enum(['1', '2', '3']), // Define as categorias como 1, 2 e 3
});

export type ProductsSchema = z.infer<typeof Products>;

export const categoryMapping = {
  1: 'Notebook',
  2: 'Celular',
  3: 'Computador',
};
export const formatPriceBR = (price: number): string => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
