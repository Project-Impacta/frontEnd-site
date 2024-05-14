import HomeHeader from '@/templates/header/home-header';
import React from 'react';

export default function NotFound(): JSX.Element {
  return (
    <>
      <HomeHeader />
      <div className="grid justify-center">
        <div className="text-light-textPrimary dark:text-dark-textPrimary flex mt-52 space-x-2 items-center">
          <h1 className="title">404</h1>
          <p className="paragraph">Essa página não existe 🙁</p>
        </div>
      </div>
    </>
  );
}
