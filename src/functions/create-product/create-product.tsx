'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductsSchema, Products } from '@/types/productTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaseSensitive, DollarSign, PackageSearch, Tag } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const API_URL = 'http://localhost:3333';

export function CreateProductDialog() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    reset,
    setValue,
  } = useForm<ProductsSchema>({
    resolver: zodResolver(Products),
  });

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => setDialogOpen(false);
  const handleSelectChange = (value: string) => {
    // Create a synthetic event to mimic the structure of a ChangeEvent
    const event = {
      target: {
        name: 'category',
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleInputChange(event);
  };
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'price') {
      const numericValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      const floatValue = !isNaN(parseFloat(numericValue))
        ? parseFloat(numericValue) / 100
        : 0;
      // Converta para um valor em ponto flutuante
      // BUG - AJUSTAR INPUT DO VALOR
      // Verifica se o valor está dentro do intervalo permitido
      if (floatValue < 10 || floatValue > 10000 || isNaN(floatValue)) {
        error =
          'Formato de preço inválido. Mínimo: R$ 10,00 - Máximo R$ 10.000,00';
      }
    } else if (name === 'description') {
      const formattedDescription = value;
      if (
        formattedDescription.length < 10 ||
        formattedDescription.length > 1024
      ) {
        error = 'Mínimo: 10 caracteres - Máximo 1024 caracteres';
      }
    } else if (name === 'category') {
      console.log('Setting category value:', value);
      setValue(name as keyof ProductsSchema, value);
      return;
    }

    setError(
      name as keyof ProductsSchema,
      { message: error },
      { shouldFocus: false },
    );
  };
  const onSubmit = async (data: ProductsSchema) => {
    console.log(onSubmit);
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        setDialogMessage(responseData.message);
        setDialogOpen(true);
      }
      setDialogMessage(responseData.message);
      setDialogOpen(true);

      reset();
    } catch (error) {
      setDialogMessage(`${error}`);
      setDialogOpen(true);
    }
  };

  return (
    <>
      {mounted && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-4 max-w-lg mx-auto justify-center">
              Cadastrar Novo Produto
            </Button>
          </DialogTrigger>
          <div className="flex justify-center">
            <DialogContent className="w-full">
              <Card className="border-none">
                <CardHeader className="items-center text-light-textPrimary dark:text-dark-textPrimary">
                  <CardTitle className="title">
                    Cadastrar Novo Produto
                  </CardTitle>
                  <CardDescription className="body">
                    Insira as informações do novo produto
                  </CardDescription>
                </CardHeader>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="name" className="flex items-center py-1">
                        Nome do produto
                        <Tag className="ml-2" />
                      </Label>
                      <Input
                        {...register('name', { required: true })}
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.name.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label
                        htmlFor="description"
                        className="flex items-center py-1"
                      >
                        Descrição do produto
                        <CaseSensitive className="ml-2" />
                      </Label>
                      <Textarea
                        {...register('description', { required: true })}
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        className="max-h-32 resize-none"
                        maxLength={1024}
                        minLength={10}
                      />
                      {errors.description && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.description.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="price" className="flex items-center py-1">
                        Preço do produto
                        <DollarSign className="ml-2" />
                      </Label>
                      <Input
                        {...register('price', {
                          required: true,
                          pattern: /^\d{1,3}(?:\.\d{3})*(,\d{1,2})?$/,
                        })}
                        id="price"
                        name="price"
                        onChange={handleInputChange}
                        maxLength={9}
                        type="number"
                      />
                      {errors.price && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.price.message}
                        </AlertDescription>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="category"
                        className="flex items-center py-1"
                      >
                        Categoria do produto
                        <PackageSearch className="ml-2" />
                      </Label>
                      <Select
                        {...register('category', {
                          required: true,
                        })}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Notebook</SelectItem>
                          <SelectItem value="2">Celular</SelectItem>
                          <SelectItem value="3">Computador</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <AlertDescription className="text-red-500 py-2">
                          {errors.category.message}
                        </AlertDescription>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <ButtonLoading /> : 'Cadastrar'}
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
}
