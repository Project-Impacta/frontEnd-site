'use client';

import { ButtonLoading } from '@/components/button/button-loading/loadingBtn';
import LogoImpactaStore from '@/components/imagens/logo-impacta';
import { AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { FormErrors } from '@/types/userTypes';
import { formatCPF } from '@/utils/form-utils';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignInData {
  cpf: string;
  password: string;
}
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    phone: '',
    cpf: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgress(100);

    if (!cpf || !password) {
      setDialogMessage(`Preencha todos os campos.`);
      setDialogOpen(true);
      setSubmitting(false);
      return;
    }

    try {
      const response = await signIn('credentials', {
        redirect: false,
        cpf: cpf.replace(/\D/g, ''),
        password,
      });
      console.log('[LOGIN_RESPONSE]:', response);

      if (!response?.error) {
        setDialogMessage('Autenticação realizada com sucesso!');
        setDialogOpen(true);
        setRedirecting(true);

        setTimeout(() => {
          setDialogMessage('Redirecionando para a página inicial...');
          setTimeout(() => {
            router.push('/home');
          }, 3000);
        }, 2000);
      } else {
        setDialogMessage('CPF ou Senha invalidas...');
        setDialogOpen(true);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setDialogMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
      );
      setDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  };
  const {
    register,
    formState: { isSubmitting },
  } = useForm<SignInData>();

  return (
    <>
      <Head>
        <title>Autentique-se</title>
      </Head>
      <div className="flex mx-auto justify-center items-center">
        <Card className="w-[500px]">
          {submitting && <Progress value={progress} />}
          <CardHeader className="items-center gap-1">
            <CardTitle className="relative lg:text-xl xl:text-2xl">
              <LogoImpactaStore />
            </CardTitle>
            <CardDescription className="text-center title text-light-textPrimary dark:text-dark-textPrimary lg:text-xl xl:text-2xl">
              Autentique-se
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={(e: React.FormEvent<Element>) => handleSignIn(e)}
            noValidate
          >
            <CardContent>
              <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    {...register('cpf', {
                      required: true,
                    })}
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    autoComplete="cpf"
                  />
                  {errors.cpf && (
                    <AlertDescription>{errors.cpf}</AlertDescription>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register('password')}
                    required
                    name="password"
                    type="password"
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setPassword(e.target.value)}
                    autoComplete="password"
                  />
                </div>
              </div>
              <CardFooter className="items-center justify-center relative top-4">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? <ButtonLoading /> : 'Autenticar'}
                </Button>
              </CardFooter>
            </CardContent>
          </form>
          {
            <AlertDialog open={dialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="title text-light-textPrimary dark:text-dark-textPrimary text-center">
                    {dialogMessage}
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    disabled={redirecting}
                    onClick={handleCloseDialog}
                  >
                    {redirecting ? <ButtonLoading /> : 'Continuar'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
          {
            <div>
              {redirecting && (
                <div className="redirecting">
                  <div className="loading-container">
                    <Progress value={progress} />
                  </div>
                </div>
              )}
            </div>
          }
        </Card>
      </div>
    </>
  );
}
