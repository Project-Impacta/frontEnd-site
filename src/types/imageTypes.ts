import { z } from 'zod';

const Image = z.object({
  _id: z.string(),
  productId: z.string(),
  url: z.string(),
  alt: z.string(),
  hash: z.string(),
  mimetype: z.string(),
});

export type ImageSchema = z.infer<typeof Image>;
