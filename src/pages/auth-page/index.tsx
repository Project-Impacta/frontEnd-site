'use client';

import LoginPage from '../account-page/login';
import RegisterPage from '../account-page/register';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderHome from '@/templates/header/home-header';
import Head from 'next/head';
import React from 'react';

export default function AuthPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <HeaderHome />
      <div className="grid mx-auto justify-center items-center">
        <Tabs defaultValue="login" className="w-[500px] py-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginPage />
          </TabsContent>
          <TabsContent value="register">
            <RegisterPage />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
