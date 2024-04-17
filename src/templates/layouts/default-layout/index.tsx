import { Box, Container } from '@/mui/material';
import ThemeProvider from '@/providers/theme-provider/theme-provider';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Container fixed>
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
