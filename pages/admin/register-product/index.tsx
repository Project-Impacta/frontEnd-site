import Demo from '@/components/card/products/CardProducts';
import { Button } from '@/components/ui/button';
import { CreateProductDialog } from '@/functions/create-product';
import HeaderHome from '@/templates/header/home-header';
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
    <div className="justify-center items-center">
      <HeaderHome />
      <div>
        <h1>Register Product Page</h1>
      </div>
      <Button>
        <Link href="/admin">Voltar</Link>
      </Button>

      <div className={'mt-20 flex flex-col'}>
        <div
          className={'grid gap-4 max-w-lg mx-auto justify-center items-center'}
        >
          <Demo />
        </div>
        <div
          className={'grid gap-4 max-w-lg mx-auto justify-center items-center'}
        >
          <CreateProductDialog />
        </div>
      </div>
    </div>
  );
};

export default RegisterProductPage;
