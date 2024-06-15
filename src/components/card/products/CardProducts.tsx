import SearchButton from '@/components/button/button-search/SearchButton';
import LoadingDisplay from '@/components/display/LoadingDisplay';
import ProductImageGallery from '@/components/imagens/ProductImageGallery';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { fetchProducts } from '@/hooks/fetchProducts';
import {
  categoryMapping,
  formatPriceBR,
  ProductsSchema,
} from '@/types/productTypes';
import { ShopCartSchema } from '@/types/shopCartTypes';
import useStore from '@/zustand/store';
import axios from 'axios';
import { ShieldX, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ProductsCard() {
  const { data: session } = useSession();
  const { products, setProducts } = useStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);
  const { addToCart } = useShoppingCart();
  const [search, setSearch] = useState('');

  const handleAddToCart = (id: string) => {
    if (!session) {
      setAuthDialogOpen(true);
      return;
    }

    const product = products.find((product) => product._id === id);
    if (!product?._id) {
      console.error('Produto não encontrado ou ID inválido');
      return;
    }

    const newItem: ShopCartSchema = {
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    };
    addToCart(newItem);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(source.token);
        if (Array.isArray(data.product)) {
          setProducts(data.product);
        } else {
          console.error('Dados de produtos inválidos:', data);
        }
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Erro ao buscar produtos:', error);
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      source.cancel('Component unmounted');
    };
  }, [setProducts]);

  if (loading) {
    return <LoadingDisplay dialogOpen={true} />;
  }

  const productsByCategory: Record<string, ProductsSchema[]> = {};
  products.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  const filteredProductsByCategory: Record<string, ProductsSchema[]> = {};
  Object.keys(productsByCategory).forEach((category) => {
    const filteredProducts = productsByCategory[category].filter(
      (product) =>
        product.name.toLowerCase().startsWith(search.toLowerCase()) ||
        product.description.toLowerCase().startsWith(search.toLowerCase()),
    );
    if (filteredProducts.length > 0) {
      filteredProductsByCategory[category] = filteredProducts;
    }
  });

  return (
    <>
      <div className="fixed bottom-8 right-8 xl:top-24 xl:right-40 z-10">
        <SearchButton value={search} onChange={setSearch} />
      </div>
      <div className="items-center justify-center">
        <div className="title text-light-textPrimary dark:text-dark-textPrimary text-center">
          Produtos
        </div>
        {Object.entries(filteredProductsByCategory).map(
          ([categoryId, categoryProducts]) => (
            <div key={categoryId}>
              <h2 className="text-lg font-semibold mb-2 mt-4">
                {categoryMapping[String(categoryId)]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {categoryProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="mt-2 p-1 rounded-lg shadow-md"
                  >
                    <CardHeader>
                      <ProductImageGallery productId={product._id ?? ''} />
                      <CardTitle className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        <ScrollArea className="h-[150px] p-1">
                          {product.description}
                        </ScrollArea>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-base text-light-textSecondary dark:text-dark-textSecondary">
                      {formatPriceBR(product.price)}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-light-textPrimary dark:text-dark-textPrimary">
                      <Button
                        className="text-lg text-green-500 hover:text-green-600"
                        onClick={() =>
                          product._id && handleAddToCart(product._id)
                        }
                      >
                        <ShoppingCart className="h-6 w-6" />
                      </Button>
                      <span>{categoryMapping[product.category]}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autenticação Necessária</DialogTitle>
          </DialogHeader>
          <Alert className="border-none">
            <ShieldX className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Você precisa estar logado para adicionar itens ao carrinho.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button asChild>
              <Link href="/account-page">Ir para Login</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
