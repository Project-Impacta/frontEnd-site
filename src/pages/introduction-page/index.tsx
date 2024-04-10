import { ButtonPrimary } from '@/components/button';
import React from 'react';

export default function IntroductionPage(): JSX.Element {
  return (
    <>
      <div>introduction page</div>
      <ButtonPrimary type="button" href="/login">
        Login - Page
      </ButtonPrimary>
      <ButtonPrimary type="button" href="/register">
        Register- Page
      </ButtonPrimary>
    </>
  );
}
