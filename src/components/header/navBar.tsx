import { SignInButton, SignOutButton } from '../button';
import ShopCartDialog from '@/functions/shop-cart/DialogShopCart';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <header
      className={
        ' h-20 flex items-end bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary'
      }
    >
      <nav
        className={'flex items-center m-auto max-w-screen-xl justify-between '}
      >
        <ul className={'flex items-center justify-between gap-10'}>
          <li>
            {session ? (
              <div className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl relative p-2 my-4">
                <ShopCartDialog />
              </div>
            ) : (
              ''
            )}
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>{session ? <Link href="/client">Meu Perfil</Link> : ''}</li>
          <li>
            {session && role === 'admin' ? (
              <Link href="/admin">Pagina do Administrador</Link>
            ) : (
              ''
            )}
          </li>
          <li>
            {session ? (
              <SignOutButton /> // Se estiver autenticado, mostra o botão de logout
            ) : (
              <SignInButton /> // Se não estiver autenticado, mostra o botão de login
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { NavBar };
