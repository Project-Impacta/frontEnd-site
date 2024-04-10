import Home from './home';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { getAPIClient } from '@/services/axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';

const indexPage = (): JSX.Element => {

  return (
    <AuthProvider>
      <Home />;
    </AuthProvider>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiCliente = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    {
      return {
        redirect: {
          destination: '/introduction',
          permanent: false,
        },
      };
    }
  }
  apiCliente.get('/client');
  return { props: {} };
};

export default indexPage;
