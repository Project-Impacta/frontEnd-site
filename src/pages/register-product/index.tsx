import ProductsList from '@/components/products/ListProducst';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';

const RegisterProduct = () => {
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
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div>
        <div className={'grid mt-10'}>
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default RegisterProduct;
