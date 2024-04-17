import { Header } from '@/components/header/header';
import { Box, Typography } from '@/mui/material';

const AdminPage = () => {
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
          Esta é a página do administrador.
        </Typography>
      </Box>
    </>
  );
};

export default AdminPage;
