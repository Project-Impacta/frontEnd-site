import { NotFound } from '@/pages';
import Link from 'next/link';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

const ServerError = (): JSX.Element => {
  return (
    <div
      className={` title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl `}
    >
      <div>
        <NotFound />
        <Link
          href="/"
          className={`link `}
          style={{ textDecoration: 'underline' }}
        >
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
