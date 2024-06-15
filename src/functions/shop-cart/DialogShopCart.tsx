'use client';

import PurchaseSummary from '@/components/list/shop-cart-list/PurchaseSummary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { DialogTitle } from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ShopCartDialog() {
  const { shoppingCart, removeFromCart, updateQuantity, clearCart } =
    useShoppingCart();
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

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

  const handleCheckoutComplete = () => {
    const newOrderId = uuidv4();
    setOrderId(newOrderId);
    setPurchaseComplete(true);
    clearCart(); // Limpa o carrinho após finalizar a compra
  };

  const handleDialogClose = () => {
    setPurchaseComplete(false);
    setOrderId(null);
  };

  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Dialog onOpenChange={handleDialogClose}>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-none">
            {purchaseComplete ? (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 text-center"
              >
                <p className="text-2xl font-bold text-green-500">
                  Compra realizada com sucesso!
                </p>
                <p className="mt-4 text-lg">
                  ID da Compra: <strong>{orderId}</strong>
                </p>
                <p className="mt-2 text-lg">
                  Em breve você receberá um email de nossa equipe para agendar a
                  entrega.
                </p>
              </motion.div>
            ) : (
              <>
                {shoppingCart.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-lg title text-center text-light-textPrimary dark:text-dark-textPrimary">
                      Seu carrinho está vazio
                    </p>
                  </div>
                ) : (
                  <PurchaseSummary
                    shoppingCart={shoppingCart}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={removeFromCart}
                    onCheckoutComplete={handleCheckoutComplete} // Passando a função aqui
                  />
                )}
              </>
            )}
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
