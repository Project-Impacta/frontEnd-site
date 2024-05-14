import { ErrorDisplay, LoadingDisplay } from '@/components/display';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchProducts } from '@/hooks/fetchProducts';
import { ProductsSchema } from '@/types/productTypes';
import React from 'react';

const ProductsList: React.FC = () => {
  const [products, setProducts] = React.useState<ProductsSchema | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleCloseDialog = () => setDialogOpen(false);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data.product)) {
          setProducts(data.product);
          setDialogMessage(data.message);
          setDialogOpen(true);
        } else {
          console.error('Dados de produtos inválidos:', data);
          setDialogMessage(data.message);
          setDialogOpen(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setDialogMessage(`` + error);
        setDialogOpen(true);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <LoadingDisplay dialogOpen={true} />;
  }

  return (
    <div>
      <div className="title text-center text-light-textPrimary dark:text-dark-textPrimary">
        Produtos Cadastrados
      </div>
      <Table className="mt-2 items-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center text-light-textPrimary dark:text-dark-textPrimary">
              ID
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Produto
            </TableHead>
            <TableHead className=" text-center text-light-textPrimary dark:text-dark-textPrimary">
              Descrição
            </TableHead>
            <TableHead className=" text-center text-light-textPrimary dark:text-dark-textPrimary">
              Categoria
            </TableHead>
            <TableHead className="text-right text-light-textPrimary dark:text-dark-textPrimary">
              Preço
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {Array.isArray(products) ? (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium text-light-textPrimary dark:text-dark-textPrimary">
                  {product._id}
                </TableCell>
                <TableCell className=" text-light-textPrimary dark:text-dark-textPrimary">
                  {product.name}
                </TableCell>
                <TableCell className="text-light-textPrimary dark:text-dark-textPrimary">
                  {product.description}
                </TableCell>
                <TableCell className="text-light-textPrimary dark:text-dark-textPrimary">
                  {product.category}
                </TableCell>
                <TableCell className="text-right text-light-textPrimary dark:text-dark-textPrimary">
                  R$ {product.price}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <div>
              <ErrorDisplay
                dialogOpen={dialogOpen}
                dialogMessage={dialogMessage}
                handleCloseDialog={handleCloseDialog}
              />
            </div>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;