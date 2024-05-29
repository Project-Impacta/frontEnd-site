import { NavBar } from '@/components/header/navBar';
import HeaderHome from '@/templates/header/home-header';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="container">
      <header>
        <HeaderHome />
      </header>
      <nav>
        <NavBar />
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
