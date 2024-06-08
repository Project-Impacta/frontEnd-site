import { ShopCartSchema } from '@/types/shopCartTypes';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ShoppingCartContextProps {
  shoppingCart: ShopCartSchema[];
  addToCart: (item: ShopCartSchema) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

interface ShoppingCartContextChildrenProps {
  children: React.ReactNode;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(
  undefined,
);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider',
    );
  }
  return context;
};

const SHOPPING_CART_STORAGE_KEY = 'shoppingCart';

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartContextChildrenProps) => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const decoded = token
    ? jwtDecode<JwtPayload & { profile: { user: { cpf: string } } }>(token)
    : null;

  const userId = decoded?.profile?.user?.cpf;

  const [shoppingCart, setShoppingCart] = useState<ShopCartSchema[]>(() => {
    if (typeof window !== 'undefined' && userId) {
      const storedCart = localStorage.getItem(
        `${SHOPPING_CART_STORAGE_KEY}_${userId}`,
      );
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && userId) {
      localStorage.setItem(
        `${SHOPPING_CART_STORAGE_KEY}_${userId}`,
        JSON.stringify(shoppingCart),
      );
    }
  }, [shoppingCart, userId]);

  const addToCart = (item: ShopCartSchema) => {
    setShoppingCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setShoppingCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setShoppingCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setShoppingCart([]);
  };

  const shoppingCartMemo = useMemo(
    () => ({
      shoppingCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [shoppingCart],
  );

  return (
    <ShoppingCartContext.Provider value={shoppingCartMemo}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
