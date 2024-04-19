import { SignInButton, SignOutButton, ThemeSwitcher } from '../button';
import { Container } from '@/mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();

  return (
    <Container maxWidth="md">
      <header
        className={
          'fixed h-20 flex items-end bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary'
        }
      >
        <nav
          className={
            'flex items-center m-auto max-w-screen-xl justify-between '
          }
        >
          <ul className={'flex items-center justify-between gap-10'}>
            <li>
              {session ? (
                <SignOutButton /> // Se estiver autenticado, mostra o botão de logout
              ) : (
                <SignInButton /> // Se não estiver autenticado, mostra o botão de login
              )}
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{session ? <Link href="/client">Meu Perfil</Link> : ''}</li>
            <li>
              {session ? (
                <Link href="/admin">Pagina do Administrador</Link>
              ) : (
                ''
              )}
            </li>
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export { Header };
