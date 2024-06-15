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
import { categoryMapping, formatPriceBR } from '@/types/productTypes';
import useStore from '@/zustand/store';
import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';
import React, { useEffect, useState } from 'react';

const ProductsList: React.FC = () => {
  const { products, setProducts, removeProduct } = useStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
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
    const source = axios.CancelToken.source();

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(source.token);
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
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Erro ao buscar produtos:', error);
          setDialogMessage(`Erro ao buscar produtos: ${error}`);
          setDialogOpen(true);
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      source.cancel('Component unmounted');
    };
  }, [setProducts]);

  const handleDeleteProduct = async (productId: string) => {
    setDeleteLoading(productId);
    try {
      // Deletar o produto
      await axios.delete(`${API_URL}/product/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
        },
      });

      // Remover produto do estado
      removeProduct(productId);

      setDialogMessage('Produto deletado com sucesso.');
      setDialogOpen(true);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      setDialogMessage(`Erro ao deletar produto: ${error}`);
      setDialogOpen(true);
    } finally {
      setDeleteLoading(null);
    }
  };

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
                  <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary space-y-4">
                    <Button
                      onClick={() => setSelectedProductId(product._id ?? '')}
                    >
                      Mostrar Imagens
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(product._id ?? '')}
                      disabled={deleteLoading === product._id}
                    >
                      {deleteLoading === product._id
                        ? 'Deletando...'
                        : 'Deletar Produto'}
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
      {dialogOpen && (
        <ErrorDisplay
          dialogOpen={dialogOpen}
          dialogMessage={dialogMessage}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default ProductsList;
