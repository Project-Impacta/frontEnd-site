import {
  AttachMoneyOutlined as AttachMoneyOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  LabelOutlined as LabelOutlinedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

const API_URL = 'http://localhost:3333';

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const token = 'ad120r9j09ASJ0912ssSA9Sj1';
      const response = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar produto');
      }

      const responseData = await response.json();
      console.log(responseData);
      resetFormData();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
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
        <DialogContent>
          <Box className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <LabelOutlinedIcon />
            <TextField
              id={'name'}
              name={'name'}
              label={'Produto'}
              style={{ gridColumn: 'span 3' }}
              value={formData.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <DescriptionOutlinedIcon />
            <TextField
              id={'description'}
              name={'description'}
              label={'Descrição'}
              style={{ gridColumn: 'span 3' }}
              multiline
              value={formData.description}
              onChange={handleInputChange}
            />
          </Box>
          <Box className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <AttachMoneyOutlinedIcon />
            <TextField
              id={'price'}
              name={'price'}
              label={'Preço'}
              style={{ gridColumn: 'span 3' }}
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Box>
          <Box className={'grid grid-cols-4 items-center text-right gap-3 p-1'}>
            <CategoryOutlinedIcon />
            <TextField
              id={'category'}
              name={'category'}
              label={'Categoria'}
              style={{ gridColumn: 'span 3' }}
              value={formData.category}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreateProduct}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
