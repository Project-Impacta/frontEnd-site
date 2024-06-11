import ProductsList from '@/components/products/ListProducst';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';

const RegisterProduct = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  if (session.user.role !== 'admin') {
    return <DeniedPage />;
  }

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <div>
        <div className="grid mt-10">
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default RegisterProduct;
