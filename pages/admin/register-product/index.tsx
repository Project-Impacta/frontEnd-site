import { CreateProductDialog } from '../functions/create-product';
import { ProductsFilter } from '../functions/products-filters';
import { ButtonPrimary } from '@/components/button';
import { Box, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';

const RegisterProductPage = () => {
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
    return <DeniedPage />; // Redireciona para uma página de acesso negado
  }
  return (
    <Container maxWidth="sm">
      <div>
        <h1>Register Product Page</h1>
      </div>
      <ButtonPrimary>
        <Link href="/admin">Voltar</Link>
      </ButtonPrimary>

      <Box className={'mt-20 flex flex-col'}>
        <Box
          className={
            'fixed top-36 w-full p-10 bg-formFieldBackground rounded-lg'
          }
        >
          <ProductsFilter />
        </Box>
        <Box
          className={
            'fixed bottom-36 w-full p-10 bg-formFieldBackground rounded-lg'
          }
        >
          <CreateProductDialog />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterProductPage;
