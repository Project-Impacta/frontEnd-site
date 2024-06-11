import { SignInButton, SignOutButton } from '../button';
import NextLink from '../ui/NextLink';
import ShopCartDialog from '@/functions/shop-cart/DialogShopCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const role = session?.user.role;
  const [currentRoute, setCurrentRoute] = useState<string>('');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setCurrentRoute(url);
      localStorage.setItem('currentRoute', url);
      console.log('Rota atual:', url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute) {
      setCurrentRoute(storedRoute);
      console.log('Rota armazenada:', storedRoute);
    }
  }, []);

  const isActiveRoute = (route: string) => {
    return currentRoute === route;
  };

  return (
    <header className="h-20 flex items-center justify-center bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary">
      <nav className="flex items-center justify-between max-w-screen-xl px-4">
        <ul className="flex items-center justify-between gap-10">
          <li className="transition duration-300 transform hover:scale-110">
            {session && role === 'cliente' ? (
              <div className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl relative p-2 my-4">
                <ShopCartDialog />
              </div>
            ) : (
              ''
            )}
          </li>
          <li className="transition duration-300 transform hover:scale-110">
            <NextLink href="/" active={isActiveRoute('/')}>
              Home
            </NextLink>
          </li>
          <li>
            {session && role === 'cliente' && (
              <NextLink href="/client" active={isActiveRoute('/client')}>
                Meu Perfil
              </NextLink>
            )}
          </li>
          <li className="transition duration-300 transform hover:scale-110">
            {session && role === 'admin' && (
              <NextLink href="/admin" active={isActiveRoute('/admin')}>
                Página do Administrador
              </NextLink>
            )}
          </li>
          <li className="transition duration-300 transform hover:scale-110">
            {session ? <SignOutButton /> : <SignInButton />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { NavBar };
