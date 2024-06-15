import CheckoutButton from '@/components/button/button-checkout/CheckoutButton';
import {
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { formatPriceBR, categoryMapping } from '@/types/productTypes';
import { ShopCartSchema } from '@/types/shopCartTypes';
import { CircleMinus, CirclePlus } from 'lucide-react';
import React from 'react';

interface PurchaseSummaryProps {
  shoppingCart: ShopCartSchema[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckoutComplete: () => void; // Adicionado aqui
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  shoppingCart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckoutComplete,
}) => {
  const calculateTotal = (): number => {
    return shoppingCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  };

  return (
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
                  <Button onClick={() => onDecrease(item._id)}>
                    <CircleMinus />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => onIncrease(item._id)}>
                    <CirclePlus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium text-light-textPrimary dark:text-dark-textPrimary flex space-x-1 items-center justify-center ">
                {formatPriceBR(item.quantity * item.price)}
              </TableCell>
              <TableCell>
                <Button onClick={() => onRemove(item._id)}>
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
        <CheckoutButton onCheckoutComplete={onCheckoutComplete} />
      </div>
    </>
  );
};

export default PurchaseSummary;
