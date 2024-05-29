import ProductsPage from '@/pages/products-page';
import Head from 'next/head';
import React from 'react';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <ProductsPage />
      </div>
    </>
  );
}
