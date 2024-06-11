import { NavBar } from '@/components/header/navBar';
import HeaderHome from '@/templates/header/home-header';
import React from 'react';

interface LayoutChildrenProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutChildrenProps) => {
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
