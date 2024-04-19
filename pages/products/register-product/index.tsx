import { RegisterProductPage } from '@/pages';
import { Layout } from '@/templates';
import React from 'react';

export default function RegisterProduct(): JSX.Element {
  return (
    <div>
      <Layout>
        <RegisterProductPage />
      </Layout>
    </div>
  );
}
