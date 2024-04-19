import { Box } from '@/mui/material';
import ThemeProvider from '@/providers/theme-provider/theme-provider';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Box>
        <main>{children}</main>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
