import { ButtonPrimary } from '../button';
import Input from '../inputs/input';
import {
  AttachMoneyOutlinedIcon,
  CategoryOutlinedIcon,
  DescriptionOutlinedIcon,
  LabelOutlinedIcon,
} from '@/mui/material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import 'dotenv/config';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ProductData {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: number;
}

const API_URL = 'http://localhost:3333';
export function CreateProductDialog() {
  const handleCreateProduct = async (formData: ProductData) => {
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          origin: `frontend-origin`,
          token: `ad120r9j09ASJ0912ssSA9Sj1`,
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };
  const { register, handleSubmit } = useForm<ProductData>();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Novo Produto
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={'title flex justify-center items-center'}>
          Produto
        </DialogTitle>
        <DialogContent className={'body flex justify-center items-center'}>
          Adicionar novo produto
        </DialogContent>
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className={'space-y-6'}
        >
          <DialogContent>
            <Box
              className={'grid grid-cols-4 items-center text-right gap-3 p-1 '}
            >
              <LabelOutlinedIcon />
              <Input
                id={'name'}
                label={'Produto'}
                style={'col-span-3'}
                {...register('name')}
              />
            </Box>
            <Box
              className={'grid grid-cols-4 items-center text-right gap-3  p-1 '}
            >
              <DescriptionOutlinedIcon />
              <Input
                id={'description'}
                label={'Descrição'}
                style={'col-span-3'}
                multiline={true}
                {...register('description')}
              />
            </Box>
            <Box
              className={'grid grid-cols-4 items-center text-right gap-3  p-1 '}
            >
              <AttachMoneyOutlinedIcon />
              <Input
                id={'price'}
                label={'Preço'}
                style={'col-span-3'}
                {...register('price')}
              />
            </Box>
            <Box
              className={'grid grid-cols-4 items-center text-right gap-3  p-1 '}
            >
              <CategoryOutlinedIcon />
              <Input
                id={'category'}
                label={'Categoria'}
                style={'col-span-3'}
                {...register('category')}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <ButtonPrimary onClick={handleClose}>Cancelar</ButtonPrimary>
            <ButtonPrimary type="submit">Cadastrar</ButtonPrimary>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
