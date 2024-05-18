'use client';

import { NavBar } from '@/components/header/navBar';
import HeaderHome from '@/templates/header/home-header';
import { useSession } from 'next-auth/react';

const ClientPage = () => {
  const { data: session } = useSession();
  const role = session?.user.role;
  return (
    <>
      <HeaderHome />
      <NavBar />
      <div className={'flex justify-center items-center flex-col'}>
        Página do Cliente
        <div>
          {role === 'cliente' && session && (
            <div
              className={
                ' w-[300px] h-[300px] border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground p-10 '
              }
            >
              <div className="fixed right-1 ">{session.user.token}</div>
            </div>
          )}
        </div>
        <div>{role === 'cliente' && <p>Você é um cliente</p>}</div>
      </div>
    </>
  );
};
export default ClientPage;
