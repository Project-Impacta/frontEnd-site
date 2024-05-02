'use client';

import Search from './SearchProduct';
import React from 'react';

const allProducts = ['Notebook', 'Celular', 'Curso'];

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [products, setProducts] = React.useState(allProducts);

  const handleSearch = React.useCallback(
    (text: string) => {
      console.log(products[0]);
      const filteredProducts = allProducts.filter((product) =>
        product.includes(text),
      );
      setProducts(filteredProducts);
    },
    [products],
  );

  return (
    <div>
      <div className="items-center mb-2 flex">
        <Search onChange={handleSearch} />
      </div>
      <ul>
        {products.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
}
