'use client';

import ButtonPrimary from '../button-primary/buttonPrimary';
import { signIn } from 'next-auth/react';

export const SignInButton = () => {
  return <ButtonPrimary onClick={() => signIn()}> Logar</ButtonPrimary>;
};
