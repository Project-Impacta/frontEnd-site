import { LoadingDisplay } from '@/components/display';
import ProductItem from '@/components/list/product-list/ProductsList';
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
    <div>
      <h1>Produtos</h1>
      <ul>
        {Array.isArray(products) ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
