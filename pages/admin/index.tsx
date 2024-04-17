import { Header } from '@/components/header/header';
import { Box, Typography } from '@/mui/material';
import { useSession } from 'next-auth/react';

const AdminPage = () => {
  const { data: session } = useSession();
  const role = session?.role;
  return (
    <>
      <Header />
      <Box
        className={
          'w-full max-w-screen-xl h-screen flex flex-col justify-center items-center'
        }
      >
        <Typography variant="h4" sx={{ my: 3 }}>
          Página do Administrador
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
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
      </Box>
    </>
  );
};

export default AdminPage;
