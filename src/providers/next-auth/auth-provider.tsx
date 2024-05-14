'use client';

import { SessionProvider } from 'next-auth/react';

export const AuthProvider = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  return <SessionProvider>{children}</SessionProvider>;
};
