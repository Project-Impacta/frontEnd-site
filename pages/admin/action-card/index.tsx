import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function ActionAreaCard() {
  return (
    <div className="py-2">
      <Link href={'/admin/register-product'}>
        <Card sx={{ width: 345, height: 172.5 }}>
          <CardActionArea>
            <CardContent
              sx={{ width: 345, height: 172.5 }}
              className={
                'border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground p-10 flex items-center justify-center hover:bg-blue-500  active:bg-blue-500 focus:outline-none '
              }
            >
              <Typography
                sx={{ my: 2 }}
                className={
                  'title title text-sm sm:text-base md:text-lg lg:text-xl xl:text-1xl text-light-textPrimary dark:text-dark-textPrimary '
                }
              >
                Cadastrar novo Produto
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}
