import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function ActionAreaCard() {
  return (
    <div className="py-2">
      <Link href={'/admin/register-product'}>
        <Card className="width: 345, height: 172.5">
          <CardContent
            className={
              'border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground p-10 flex items-center justify-center shadow-lg transition-all duration-700 hover:scale-110'
            }
          >
            <div
              className={
                'title text-center text-light-textPrimary dark:text-dark-textPrimary '
              }
            >
              Cadastrar novo Produto
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
