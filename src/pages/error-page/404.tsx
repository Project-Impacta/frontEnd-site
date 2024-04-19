import React from 'react';

export default function NotFound(): JSX.Element {
  return (
    <div>
      <div className="text-light-textPrimary dark:text-dark-textPrimary flex items-center justify-center space-x-4">
        <h1 className="title">404</h1>
        <p className="paragraph">Essa página não existe 🙁</p>
      </div>
    </div>
  );
}
