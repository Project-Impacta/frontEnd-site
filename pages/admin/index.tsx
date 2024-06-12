import ActionAreaCard from '@/components/card/action-card';
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
    <div className="justify-center items-center">
      <div className="grid gap-4 justify-center items-center">
        <div>
          <ActionAreaCard
            href={'/admin/register-product'}
            title={'Área de Produtos'}
          />
        </div>
        <div>
          <ActionAreaCard
            href={'/admin/admin-list'}
            title={'Área de Administradores'}
          />
        </div>
        <div>
          <ActionAreaCard
            href={'/admin/client-list'}
            title={'Área de Clientes'}
          />
        </div>
      </div>
    </div>
  );
}
