import { ActionAreaCard } from '@/components/card';
import { Header } from '@/components/header/header';
import { Box, Container, Typography } from '@/mui/material';

const AdminPage = () => {
  return (
    <Container maxWidth="xs">
      <Header />
      <Box
        className={
          'w-full max-w-screen-xl h-screen flex justify-center items-center flex-col '
        }
      >
        <Typography variant="h4" sx={{ my: 3 }}>
          Página do Administrador
        </Typography>
        <Box>
          <ActionAreaCard />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
