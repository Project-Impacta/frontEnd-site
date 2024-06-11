import NotFound from '@/pages/error-page/404';
import Link from 'next/link';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

const ServerError = (): JSX.Element => {
  return (
    <div
      className={` title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl grid`}
    >
      <div className="grid">
        <NotFound />
        <Link
          href="/"
          className={`link justify-center items-center flex `}
          style={{ textDecoration: 'underline' }}
        >
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
