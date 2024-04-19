import { ButtonPrimary } from '@/components/button';
import { CreateProductDialog } from '@/components/functions/create-product';
import { ProductsFilter } from '@/components/functions/products-filters';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function RegisterProductPage(): JSX.Element {
  const { data: session } = useSession();
  return (
    <Container maxWidth="sm">
      <div>
        <h1>Register Product Page</h1>
      </div>
      <ButtonPrimary>
        <Link href="/admin">Voltar</Link>
      </ButtonPrimary>
      {session && (
        <Box className={'mt-20 flex flex-col'}>
          <Box
            className={
              'flex justify-center items-center p-10 border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground fixed mt-36'
            }
          >
            <ProductsFilter />
          </Box>
          <Box
            className={
              'flex justify-center items-center p-10 border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground fixed'
            }
          >
            <CreateProductDialog />
          </Box>
          <Box
            className={
              'flex justify-center items-center p-10 border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground fixed mt-80'
            }
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Produto</TableCell>
                    <TableCell align="right">Preço&nbsp;(R$)</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="right">44po12huj</TableCell>
                        <TableCell align="right">Produto{i}</TableCell>
                        <TableCell align="right">R$ 192,00</TableCell>
                        <TableCell align="right">Vasco</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Container>
  );
}
