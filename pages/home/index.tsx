import { NavBar } from '@/components/header/navBar';
import ProductsPage from '@/pages/products-page';
import HeaderHome from '@/templates/header/home-header';
import Head from 'next/head';
import React from 'react';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <HeaderHome />
        <NavBar />
        <div
          className={
            'w-full max-w-screen-xl py-10 flex justify-center items-center'
          }
        >
          <ProductsPage />
        </div>
      </div>
    </>
  );
}
