import { ProductsSchema } from '@/types/productTypes';
import React from 'react';

interface ProductItemProps {
  product: ProductsSchema;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { name, price, description, category } = product;
  return (
    <div>
      {name}
      {price}
      {description}
      {category}
    </div>
  );
};

export default ProductItem;
