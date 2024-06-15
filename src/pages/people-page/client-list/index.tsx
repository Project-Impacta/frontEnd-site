import LoadingDisplay from '@/components/display/LoadingDisplay';
import ListClientComponent from '@/components/list/client-list/ListClientComponent';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';

const ListClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingDisplay dialogOpen={true} />;
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
        <title>Clientes</title>
      </Head>
      <ListClientComponent />
    </>
  );
};

export default ListClient;
