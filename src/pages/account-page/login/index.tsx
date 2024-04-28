'use client';

import RegisterPage from '../register';
import { LogoImpactaStore } from '@/components/imagens';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderHome from '@/templates/header/home-header';
import React from 'react';

export default function LoginPage(): JSX.Element {
  return (
    <>
      <HeaderHome />
      <div className="grid mx-auto justify-center items-center">
        <Tabs
          defaultValue="account"
          className="w-[340px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] 2xl:w-[550px] md:py-8 lg:py-10 xl:py-5 2xl:py-14"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="items-center justify-center flex flex-col">
              <CardHeader className="items-center gap-1">
                <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  <LogoImpactaStore />
                </CardTitle>
                <CardDescription className="text-center title text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  Autentique-se
                </CardDescription>
              </CardHeader>
              <CardContent className="grid space-y-2 w-full gap-1.5 ">
                <div className=" col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <InputOTP maxLength={11}>
                    <InputOTPGroup className="w-64 min-w-full">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={9} />
                      <InputOTPSlot index={10} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className=" col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Logar</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <RegisterPage />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
