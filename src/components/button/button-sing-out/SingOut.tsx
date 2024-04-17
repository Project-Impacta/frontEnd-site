'use client';

import ButtonPrimary from '../button-primary/buttonPrimary';
import { signOut } from 'next-auth/react';

export const SingOutButton = () => {
  return <ButtonPrimary onClick={() => signOut()}> Sair</ButtonPrimary>;
};
