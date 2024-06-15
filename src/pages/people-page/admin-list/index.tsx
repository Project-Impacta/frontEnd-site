import LoadingDisplay from '@/components/display/LoadingDisplay';
import ListAdminComponent from '@/components/list/admin-list/ListAdminComponent';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DeniedPage from 'pages/denied';

const ListAdmin = () => {
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
        <title>Administradores</title>
      </Head>
      <ListAdminComponent />
    </>
  );
};

export default ListAdmin;
