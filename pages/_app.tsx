import '../src/styles/tailwind.css';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import { AuthProvider, ThemeProvider } from '@/providers';
import { Layout } from '@/templates';
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
