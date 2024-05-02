import { ProductsSchema } from '@/types/productTypes';
import PropTypes from 'prop-types';
import React from 'react';

interface ProductItemProps {
  product: ProductsSchema;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li key={product._id}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </li>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
