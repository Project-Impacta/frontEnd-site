import { Box, Container } from '@/mui/material';
import ThemeProvider from '@/providers/theme-provider/theme-provider';
import HeaderAuthentication from '@/templates/header/authentication-header';
import React from 'react';

const IntroductionLayout = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <HeaderAuthentication />
      <Container fixed>
        <Box>
          <main>{children}</main>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default IntroductionLayout;
