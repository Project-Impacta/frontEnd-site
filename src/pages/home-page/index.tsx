import { Header } from '@/components/header/header';
import { Box, Container, Typography } from '@/mui/material';
import Head from 'next/head';
import React from 'react';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth="xs">
        <Header />
        <Box
          className={
            'w-full max-w-screen-xl h-screen flex justify-center items-center'
          }
        >
          <Typography variant="h4" sx={{ my: 3 }}>
            Página Home
          </Typography>
        </Box>
      </Container>
    </>
  );
}
