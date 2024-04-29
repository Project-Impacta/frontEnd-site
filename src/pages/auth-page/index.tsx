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
        <Tabs
          defaultValue="login"
          className="w-[340px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[550px] md:py-8 lg:py-10 xl:py-5 2xl:py-14"
        >
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
