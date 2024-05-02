import { LoadingDisplay } from '@/components/display';
import ProductItem from '@/functions/product-list/ProductsListCard';
import { fetchProducts } from '@/hooks/fetchProducts';
import { ProductsSchema } from '@/types/productTypes';
import React, { useState, useEffect } from 'react';

const ProductsList = () => {
  const [products, setProducts] = useState<ProductsSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    return <LoadingDisplay />;
  }

  return (
    <div className="items-center justify-center container">
      <h1 className="title text-center">Produtos</h1>
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(products) ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
