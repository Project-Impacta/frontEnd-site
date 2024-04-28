'use client ';

import { ButtonLoading } from '@/components/button/button-loading/loadingBtn';
import { LogoImpactaStore } from '@/components/imagens';
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
import {
  formatCPF,
  formatPhone,
  isValidCPF,
  validateEmail,
} from '@/lib/utils/form-utils';
import { FormData, FormDataSchema } from '@/types/userTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import 'dotenv/config';
import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';

const API_URL = 'http://localhost:3333';

const RegisterPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormDataSchema>({
    resolver: zodResolver(FormData),
  });
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';
    if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      error = isValidCPF(formattedCPF) ? '' : 'Insira somente números';
      setError(
        name as keyof FormDataSchema,
        { message: error },
        { shouldFocus: false },
      );
    } else if (name === 'phone') {
      setError(
        name as keyof FormDataSchema,
        { message: error },
        { shouldFocus: false },
      );
    } else if (name === 'email') {
      error = validateEmail(value) || '';
      setError(
        name as keyof FormDataSchema,
        { message: error },
        { shouldFocus: false },
      );
    }

    setValue(name as keyof FormDataSchema, value);
  };

  async function onSubmit(data: FormDataSchema) {
    const requiredFields = [data];
    const incompleteFields = requiredFields.filter(
      (field) => !data[field as unknown as keyof FormDataSchema],
    );

    if (incompleteFields.length > 0) {
      setDialogMessage(`Preencha todos os campos.`);
      setDialogOpen(true);
    }

    const formDataForBackend = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ''),
      phone: data.phone.replace(/\D/g, ''),
      email: data.email.toLowerCase().trim(),
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone.replace(/\D/g, ''),
        cpf: data.cpf.replace(/\D/g, ''),
        email: data.email,
        password: data?.password,
        formDataForBackend,
      }),
      headers: {
        'Content-Type': 'application/json',
        secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
        token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
      },
    };

    try {
      const response = await fetch(`${API_URL}/client`, requestOptions);

      if (response.ok) {
        setDialogMessage('Cadastro realizado com sucesso!');
        setDialogOpen(true);
      } else {
        setDialogMessage(
          'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
        );

        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
      );
      setDialogOpen(true);
    }
  }

  return (
    <>
      <Head>
        <title>Cadastre-se</title>
      </Head>
      <div className="flex mx-auto justify-center items-center">
        <Card>
          <CardHeader className="items-center gap-1">
            <CardTitle className="relative lg:text-xl xl:text-2xl">
              <LogoImpactaStore />
            </CardTitle>
            <CardDescription className="text-center title text-light-textPrimary dark:text-dark-textPrimary lg:text-xl xl:text-2xl">
              Cadastre-se
            </CardDescription>
          </CardHeader>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    {...register('firstName', { required: true })}
                    id="firstName"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Último Nome</Label>
                  <Input
                    {...register('lastName', { required: true })}
                    id="lastName"
                    type="text"
                    onChange={handleChange}
                    name="lastName"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    {...register('cpf', {
                      required: true,
                      pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      onChange: (e) => {
                        e.target.value = formatCPF(e.target.value);
                      },
                    })}
                    id="cpf"
                    type="text"
                    name="cpf"
                  />
                  {errors.cpf && (
                    <AlertDescription>{errors.cpf.message}</AlertDescription>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Telefone Celular</Label>
                  <Input
                    {...register('phone', {
                      required: true,
                      onChange: (e) => {
                        e.target.value = formatPhone(e.target.value);
                      },
                    })}
                    id="phone"
                    type="text"
                    name="phone"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    {...register('email', {
                      required: true,
                      validate: {
                        validateEmail,
                      },
                    })}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <AlertDescription className="py-2">
                      {errors.email.message}
                    </AlertDescription>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register('password', {
                      required: true,
                      minLength: {
                        value: 8,
                        message: 'A senha deve ter no mínimo 8 caracteres',
                      },
                    })}
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="repeatPassword">Repita sua Senha</Label>
                  <Input
                    {...register('repeatPassword', { required: true })}
                    id="repeatPassword"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <CardFooter className="items-center justify-center relative top-4">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? <ButtonLoading /> : 'Cadastrar'}
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
                  <AlertDialogAction onClick={handleCloseDialog}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
