import { ButtonLoading } from '@/components/button/button-loading/loadingBtn';
import ErrorDisplay from '@/components/display/ErrorDisplay';
import { AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegisterAdmin } from '@/functions/admins/registerAdmin';
import {
  AdminDataProfile,
  AdminDataProfileSchema,
} from '@/types/adminDataTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CreateAdminDialog: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<AdminDataProfileSchema>({
    resolver: zodResolver(AdminDataProfile),
  });

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { registerAdmin, loading } = useRegisterAdmin();
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => setDialogOpen(false);

  const onSubmit = async (data: AdminDataProfileSchema) => {
    try {
      await registerAdmin(data);
      setDialogMessage('Administrador registrado com sucesso.');
      setDialogOpen(true);
      reset();
    } catch (error: any) {
      setDialogMessage(`Erro ao registrar administrador: ${error.message}`);
      setDialogOpen(true);
    }
  };

  return (
    <>
      {mounted && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-4 max-w-lg mx-auto justify-center">
              Registrar Novo Administrador
            </Button>
          </DialogTrigger>
          <div className="flex justify-center">
            <DialogContent className="w-full">
              <Card className="border-none">
                <CardHeader className="items-center text-light-textPrimary dark:text-dark-textPrimary">
                  <CardTitle className="title">
                    Registrar Novo Administrador
                  </CardTitle>
                  <CardDescription className="body">
                    Insira as informações do novo administrador
                  </CardDescription>
                </CardHeader>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="cpf" className="flex items-center py-1">
                        CPF do administrador
                      </Label>
                      <Input
                        {...register('cpf', { required: true })}
                        id="cpf"
                        name="cpf"
                        type="text"
                      />
                      {errors.cpf && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.cpf.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="firstName"
                        className="flex items-center py-1"
                      >
                        Nome do administrador
                      </Label>
                      <Input
                        {...register('firstName', { required: true })}
                        id="firstName"
                        name="firstName"
                        type="text"
                      />
                      {errors.firstName && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.firstName.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="lastName"
                        className="flex items-center py-1"
                      >
                        Sobrenome do administrador
                      </Label>
                      <Input
                        {...register('lastName', { required: true })}
                        id="lastName"
                        name="lastName"
                        type="text"
                      />
                      {errors.lastName && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.lastName.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="email" className="flex items-center py-1">
                        Email do administrador
                      </Label>
                      <Input
                        {...register('email', { required: true })}
                        id="email"
                        name="email"
                        type="email"
                      />
                      {errors.email && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.email.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="password"
                        className="flex items-center py-1"
                      >
                        Senha do administrador
                      </Label>
                      <Input
                        {...register('password', { required: true })}
                        id="password"
                        name="password"
                        type="password"
                      />
                      {errors.password && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.password.message}
                        </AlertDescription>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button type="submit" disabled={isSubmitting || loading}>
                      {isSubmitting || loading ? (
                        <ButtonLoading />
                      ) : (
                        'Registrar'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </DialogContent>
          </div>
          {
            <ErrorDisplay
              dialogOpen={dialogOpen}
              dialogMessage={dialogMessage}
              handleCloseDialog={handleCloseDialog}
            />
          }
        </Dialog>
      )}
    </>
  );
};
