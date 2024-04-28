import Input from '../../../pages/admin/inputs/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productsFilterSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;
export function ProductsFilter() {
  const { register, handleSubmit } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
  });

  function handleFilterProducts(data: ProductsFilterSchema) {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className={'flex items-center gap-2'}
    >
      <Input label={'ID do pedido'} {...register('id')} />
      <Input label={'Nome do produto'} {...register('name')} />
      <button type="submit">`${<SearchIcon />}`</button>
    </form>
  );
}
