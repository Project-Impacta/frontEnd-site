import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProductsSchema } from '@/types/productTypes';
import PropTypes from 'prop-types';
import React from 'react';

interface ProductItemProps {
  product: ProductsSchema;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div>
      <Card key={product._id} className="mt-2 items-center">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>R$ {product.price}</CardDescription>
        </CardHeader>
        <CardContent>{product.description}</CardContent>
        <CardFooter className="justify-end">{product.category}</CardFooter>
      </Card>
    </div>
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
