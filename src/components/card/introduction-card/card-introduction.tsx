import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Head from 'next/head';
import React from 'react';

const IntroductionCard = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Bem-vindo(a)</title>
      </Head>
      <div className="container mx-auto px-12 py-4 mt-16 text-center">
        <Card className="py-8">
          <CardHeader className="justify-center items-center">
            <CardTitle className="title text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Bem-vindo(a) ao Store Impacta!
            </CardTitle>
            <CardDescription className="body text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl py-4">
              Este é um projeto acadêmico, então alguns processos são fictícios.
            </CardDescription>
            <CardDescription className="body text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg py-4">
              Escolha uma das opções abaixo para acessar:
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-around text-sm sm:text-base md:text-lg lg:text-xl">
            {children}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default IntroductionCard;
