'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { categoryMapping, formatPriceBR } from '@/types/productTypes';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CircleMinus, CirclePlus, ShoppingCart } from 'lucide-react';
import React from 'react';

export default function ShopCartDialog() {
  const { shoppingCart, removeFromCart, updateQuantity } = useShoppingCart();

  const handleIncrease = (id: string) => {
    const item = shoppingCart.find((item) => item._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const item = shoppingCart.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const calculateTotal = (): number => {
    return shoppingCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative gap-4 max-w-lg mx-auto justify-center">
          <ShoppingCart />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader className="text-center items-center justify-center">
          <DialogTitle>Carrinho de compras</DialogTitle>
        </DialogHeader>
        <div>
          <Card className="border-none">
            {shoppingCart.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-lg title text-center text-light-textPrimary dark:text-dark-textPrimary">
                  Seu carrinho está vazio
                </p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Produto
                      </TableHead>
                      <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Preço
                      </TableHead>
                      <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Categoria
                      </TableHead>
                      <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Quantidade
                      </TableHead>
                      <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Total
                      </TableHead>
                      <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {shoppingCart.map((item) => (
                    <TableBody key={item._id}>
                      <TableRow>
                        <TableCell className="font-medium body text-light-textPrimary dark:text-dark-textPrimary text-nowrap">
                          {item.name}
                        </TableCell>
                        <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                          {formatPriceBR(item.price)}
                        </TableCell>
                        <TableCell className="body text-light-textPrimary dark:text-dark-textPrimary">
                          {categoryMapping[item.category]}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => handleDecrease(item._id)}>
                              <CircleMinus />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button onClick={() => handleIncrease(item._id)}>
                              <CirclePlus />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium text-light-textPrimary dark:text-dark-textPrimary flex space-x-1 items-center justify-center ">
                          {formatPriceBR(item.quantity * item.price)}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => removeFromCart(item._id)}>
                            Remover Produto
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
                <Separator className="my-4" />
                <div className="flex relative justify-between mr-6">
                  <div className="text-lg font-bold text-light-textPrimary ml-2 mt-2 dark:text-dark-textPrimary">
                    Total do Pedido: {formatPriceBR(calculateTotal())}
                  </div>
                  <Button className="mr-4 w-[145px]">Finalizar compra</Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
