'use client';

import { Header } from '@/components/header/header';
import { Box, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useSession } from 'next-auth/react';

const ClientPage = () => {
  const { data: session } = useSession();
  const role = session?.user.role;
  const token = session?.user.token;
  const decoded = token ? jwtDecode(token) : null;
  console.log(decoded);
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
          {role === 'cliente' && session && (
            <pre
              className={
                'border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground p-10 '
              }
            >
              {role === 'cliente' && session.user.token}
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
