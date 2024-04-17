import { SingOutButton } from '../button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();
  return (
    <header
      className={
        'fixed w-full h-20 flex items-center bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary'
      }
    >
      <nav
        className={
          'flex items-center m-auto max-w-screen-xl justify-between w-full'
        }
      >
        <ul className={'flex items-center justify-between gap-10'}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/client">Cliente</Link>
          </li>
          <li>
            <Link href="/admin">Administrador</Link>
          </li>
          {session && (
            <li>
              <SingOutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
