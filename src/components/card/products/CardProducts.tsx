'use client';

import { LoadingDisplay } from '@/components/display';
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
import { ShieldX, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function ProductsCard() {
  const { data: session } = useSession();
  const [products, setProducts] = React.useState<ProductsSchema[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
  const { addToCart } = useShoppingCart();

  const handleAddToCart = (id: string) => {
    if (!session) {
      setAuthDialogOpen(true);
      return;
    }

    const product = products?.find((product) => product._id === id);
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

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data.product)) {
          setProducts(data.product);
        } else {
          console.error('Dados de produtos inválidos:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <LoadingDisplay dialogOpen={true} />;
  }

  return (
    <div className="items-center justify-center">
      <h1 className="title text-light-textPrimary dark:text-dark-textPrimary text-center">
        Produtos
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(products) ? (
          products.map((product) => (
            <Card key={product._id} className="mt-2 items-center grid ">
              <CardHeader>
                <CardTitle className="title text-light-textPrimary dark:text-dark-textPrimary">
                  {product.name}
                </CardTitle>
                <CardDescription className="body text-light-textSecondary dark:text-dark-textSecondary">
                  <ScrollArea className="h-[150px] w-[350px] p-1">
                    {product.description}
                  </ScrollArea>
                </CardDescription>
              </CardHeader>
              <CardContent className="body text-light-textSecondary dark:text-dark-textSecondary">
                {formatPriceBR(product.price)}
              </CardContent>
              <CardFooter className="justify-between body text-light-textPrimary dark:text-dark-textPrimary px-6">
                <Button
                  onClick={() => product._id && handleAddToCart(product._id)}
                >
                  <ShoppingCart />
                </Button>
                {categoryMapping[product.category]}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="fixed">
            <Alert className="border-none">
              <ShieldX className="h-4 w-4" />
              <AlertTitle>Produtos não encontrados</AlertTitle>
              <AlertDescription>
                Ocorreu um problema na listagem de produtos
              </AlertDescription>
            </Alert>
          </div>
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
    </div>
  );
}
