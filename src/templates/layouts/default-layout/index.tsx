import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="container">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
