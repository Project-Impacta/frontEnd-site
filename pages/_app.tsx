import '../src/styles/tailwind.css';
import LoadingDisplay from '@/components/display/LoadingDisplay';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import { AuthProvider } from '@/providers';
import ThemeProvider from '@/providers/theme-provider/theme-provider';
import Layout from '@/templates/layouts/default-layout';
import useStore from '@/zustand/store';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import React, { useMemo, useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const setCurrentRoute = useStore((state) => state.setCurrentRoute);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setCurrentRoute(url);
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [setCurrentRoute]);

  const memoizedComponent = useMemo(
    () => <Component {...pageProps} />,
    [Component, pageProps],
  );

  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ShoppingCartProvider>
          <Layout>
            {!mounted ? (
              <LoadingDisplay dialogOpen={!mounted} />
            ) : (
              memoizedComponent
            )}
          </Layout>
        </ShoppingCartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
