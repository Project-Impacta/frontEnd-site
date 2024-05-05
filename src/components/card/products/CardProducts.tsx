'use client';

import { LoadingDisplay } from '@/components/display';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchProducts } from '@/hooks/fetchProducts';
import { ProductsSchema } from '@/types/productTypes';
import React from 'react';

export default function ProductsCard() {
  const [products, setProducts] = React.useState<ProductsSchema | null>(null);
  const [loading, setLoading] = React.useState(true);

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
    <div className="items-center justify-center container">
      <h1 className="title text-center">Produtos</h1>
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(products) ? (
          products.map((product) => (
            <Card key={product._id} className="mt-2 items-center">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>R$ {product.price}</CardDescription>
              </CardHeader>
              <CardContent>{product.description}</CardContent>
              <CardFooter className="justify-end">
                {product.category}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
}
