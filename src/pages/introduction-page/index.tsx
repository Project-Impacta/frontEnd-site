import { ButtonPrimary } from '@/components/button';
import { IntroductionCard } from '@/components/card';
import { Box } from '@/mui/material';
import { IntroductionLayout } from '@/templates';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function IntroductionPage(): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <IntroductionLayout>
        <IntroductionCard>
          <Box display="flex" alignItems="center" paddingBottom={'20px'}>
            <ButtonPrimary type="button" href="/login">
              Logar
            </ButtonPrimary>
          </Box>

          <Box display="flex" alignItems="center" paddingBottom={'20px'}>
            <ButtonPrimary type="button" href="/register">
              Cadastrar
            </ButtonPrimary>
          </Box>
        </IntroductionCard>
      </IntroductionLayout>
    </ThemeProvider>
  );
}
