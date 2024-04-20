import ActionAreaCard from './action-card';
import { Header } from '@/components/header/header';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';
import React from 'react';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Verifica se a sessão está carregando
  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  // Se não houver sessão, redirecione para a página de login
  if (!session) {
    router.push('/login');
    return null; // Evita o flash de conteúdo não protegido
  }

  // Se o usuário estiver autenticado, verifica se é um administrador
  if (session.user.role !== 'admin') {
    return <DeniedPage />;
  }

  // Se o usuário estiver autenticado e for um administrador, renderize a página de administração
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
}
