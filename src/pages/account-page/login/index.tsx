import { LoginForm } from '@/api/auth';
import { Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Autentique-se</title>
      </Head>
      <Box>
        <LoginForm />
      </Box>
    </>
  );
};

export default LoginPage;
