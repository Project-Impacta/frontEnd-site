import Head from 'next/head';
import React from 'react';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div
          className={
            'w-full max-w-screen-xl h-screen flex justify-center items-center'
          }
        >
          Página Home
        </div>
      </div>
    </>
  );
}
