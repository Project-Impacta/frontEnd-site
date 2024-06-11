import ErrorDisplay from '../display/ErrorDisplay';
import LoadingDisplay from '../display/LoadingDisplay';
import { Button, Input } from '../ui';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateProductDialog } from '@/functions';
import ImageGallery from '@/functions/UploadImage';
import { fetchProducts } from '@/hooks/fetchProducts';
import {
  categoryMapping,
  formatPriceBR,
  ProductsSchema,
} from '@/types/productTypes';
import React, { useEffect, useState } from 'react';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductsSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const productFilter = products.filter((product) =>
    product.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const handleCloseDialog = () => setDialogOpen(false);

  useEffect(() => {
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
        setDialogMessage(`Erro ao buscar produtos: ${error}`);
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
      <div className="title flex justify-between items-center text-light-textPrimary dark:text-dark-textPrimary">
        <div className="relative z-10">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar Produto"
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none shadow-md transition-all duration-300"
          />
        </div>
        Produtos Cadastrados
        <div>
          <CreateProductDialog />
        </div>
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
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Ações
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Imagens
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {Array.isArray(products) ? (
            productFilter.map((product) => (
              <React.Fragment key={product._id}>
                <TableRow>
                  <TableCell className="font-medium body text-light-textPrimary dark:text-dark-textPrimary">
                    {product._id}
                  </TableCell>
                  <TableCell className=" body text-light-textPrimary dark:text-dark-textPrimary">
                    {product.name}
                  </TableCell>
                  <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                    <ScrollArea className="h-[60px]  p-1">
                      {product.description}
                    </ScrollArea>
                  </TableCell>
                  <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                    {
                      categoryMapping[
                        product.category as unknown as keyof typeof categoryMapping
                      ]
                    }
                  </TableCell>
                  <TableCell className="text-right body text-light-textPrimary dark:text-dark-textPrimary flex space-x-1 items-center justify-center py-16">
                    <div>{formatPriceBR(product.price)}</div>
                  </TableCell>
                  <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                    <Button
                      onClick={() => setSelectedProductId(product._id ?? '')}
                    >
                      Mostrar Imagens
                    </Button>
                  </TableCell>
                  <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                    {selectedProductId === product._id && (
                      <ImageGallery productId={product._id} />
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <ErrorDisplay
                  dialogOpen={dialogOpen}
                  dialogMessage={dialogMessage}
                  handleCloseDialog={handleCloseDialog}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;
