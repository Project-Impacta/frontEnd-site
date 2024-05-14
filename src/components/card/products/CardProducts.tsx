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
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchProducts } from '@/hooks/fetchProducts';
import { categoryMapping, ProductsSchema } from '@/types/productTypes';
import { ShieldX, ShoppingCart } from 'lucide-react';
import React from 'react';

export default function ProductsCard() {
  const [products, setProducts] = React.useState<ProductsSchema[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const handleAddToCart = () => {};

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
                R$ {product.price}
              </CardContent>
              <CardFooter className="justify-between  body text-light-textPrimary dark:text-dark-textPrimary px-6">
                <Button onClick={handleAddToCart}>
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
    </div>
  );
}
