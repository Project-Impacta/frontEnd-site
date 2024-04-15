import { Box, Typography } from '@/mui/material';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import React from 'react';

const IntroductionCard = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Bem-vindo(a)</title>
      </Head>
      <ThemeProvider attribute="class">
        <Box
          sx={{
            mt: '12vw',
            maxHeight: '200vh',
            maxWidth: '100vw',
          }}
          className={`border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 border-solid rounded-lg dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground`}
        >
          <Box
            textAlign="center"
            p={2}
            className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            <Typography variant="h4">Bem-vindo(a) ao Store Impacta!</Typography>
          </Box>
          <Box
            textAlign="center"
            p={2}
            className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            <Typography>
              Este é um projeto acadêmico, então alguns processos são fictícios.
            </Typography>
          </Box>

          <Box
            textAlign="center"
            p={2}
            className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            <Typography>Escolha uma das opções abaixo para acessar:</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default IntroductionCard;
