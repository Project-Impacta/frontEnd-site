'use client';

import { ProductsSchema } from '@/types/productTypes';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { CaseSensitive, DollarSign, PackageSearch, Tag } from 'lucide-react';
import React, { useState } from 'react';

const API_URL = 'http://localhost:3333';

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductsSchema>({
    name: '',
    description: '',
    price: 0,
    category: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error('Erro ao criar produto: ' + responseData);
      }

      resetFormData();
    } catch (error) {
      throw new Error('Erro ao criar produto' + error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 0,
    });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>Novo Produto</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={'title flex justify-center items-center'}>
          Produto
        </DialogTitle>
        <DialogContent className={'body flex justify-center items-center'}>
          Adicionar novo produto
        </DialogContent>
        <DialogContent>
          <div className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <Tag />
            <TextField
              id={'name'}
              name={'name'}
              label={'Produto'}
              style={{ gridColumn: 'span 3' }}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <CaseSensitive />
            <TextField
              id={'description'}
              name={'description'}
              label={'Descrição'}
              style={{ gridColumn: 'span 3' }}
              multiline
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <DollarSign />
            <TextField
              id={'price'}
              name={'price'}
              label={'Preço'}
              style={{ gridColumn: 'span 3' }}
              type="string"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <PackageSearch />
            <TextField
              id={'category'}
              name={'category'}
              label={'Categoria'}
              style={{ gridColumn: 'span 3' }}
              type="number"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreateProduct}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
