import '../src/styles/tailwind.css';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import { AuthProvider } from '@/providers';
import ThemeProvider from '@/providers/theme-provider/theme-provider';
import Layout from '@/templates/layouts/default-layout';
import type { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ShoppingCartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ShoppingCartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
