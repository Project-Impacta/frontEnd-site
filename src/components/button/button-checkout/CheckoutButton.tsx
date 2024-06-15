import { Button } from '@/components/ui/button';
import React from 'react';

interface CheckoutButtonProps {
  onCheckoutComplete: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onCheckoutComplete,
}) => {
  return <Button onClick={onCheckoutComplete}>Finalizar compra</Button>;
};

export default CheckoutButton;
