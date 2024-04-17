'use client';

import { Header } from '@/components/header/header';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

const ClientPage = () => {
  const { data: session } = useSession();
  const role = session?.role;
  return (
    <>
      <Header />
      <Box
        className={
          'w-full max-w-screen-xl h-screen flex justify-center items-center flex-col'
        }
      >
        <Typography variant="h4" sx={{ my: 3 }}>
          Página do Cliente
        </Typography>
        <Typography variant="h5" sx={{ my: 3 }}>
          {session && (
            <pre
              className={
                'border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground p-10'
              }
            >
              {JSON.stringify(session, null, 2)}
            </pre>
          )}
        </Typography>
        <Typography variant="h6" sx={{ my: 1 }}>
          {role === 'cliente' && <p>Você é um cliente</p>}
        </Typography>
      </Box>
    </>
  );
};
export default ClientPage;
