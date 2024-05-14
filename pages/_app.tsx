import '../src/styles/tailwind.css';
import { AuthProvider, ThemeProvider } from '@/providers';
import { Layout } from '@/templates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import React from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
