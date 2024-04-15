import { AuthProvider } from '@/contexts/auth/AuthContext';
import { HomePage } from '@/pages';
import { api } from '@/services/api';
import { getAPIClient } from '@/services/axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';

export default function Home(): JSX.Element {
  useEffect(() => {
    api.get('/client');
  }, []);

  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiCliente = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/introduction',
        permanent: false,
      },
    };
  }
  apiCliente.get('/client');
  return { props: {} };
};
