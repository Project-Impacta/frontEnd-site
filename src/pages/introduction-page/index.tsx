import { IntroductionCard } from '@/components/card';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/providers';
import Link from 'next/link';
import React from 'react';

export default function IntroductionPage(): JSX.Element {
  return (
    <ThemeProvider attribute="class">
      <IntroductionCard>
        <div>
          <Link href="/login">
            <Button type="button">Logar</Button>
          </Link>
        </div>

        <div>
          <Link href="/register">
            <Button type="button">Registrar</Button>
          </Link>
        </div>
      </IntroductionCard>
    </ThemeProvider>
  );
}
