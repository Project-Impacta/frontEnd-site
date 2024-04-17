import { Header } from '@/components/header/header';
import HeaderHome from '@/templates/header/home-header';
import { Box, Container } from '@mui/material';
import React, { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = (props: HomeLayoutProps): JSX.Element => {
  return (
    <>
      <Box>{props.children}</Box>
    </>
  );
};

export default HomeLayout;
