import LoadingDisplay from '@/components/display/LoadingDisplay';
import { Input } from '@/components/ui';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { fetchProducts } from '@/hooks/fetchProducts';
import {
  categoryMapping,
  formatPriceBR,
  ProductsSchema,
} from '@/types/productTypes';
import { ShopCartSchema } from '@/types/shopCartTypes';
import { Search, ShieldX, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ProductsCard() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<ProductsSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);
  const { addToCart } = useShoppingCart();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleAddToCart = (id: string) => {
    if (!session) {
      setAuthDialogOpen(true);
      return;
    }

    const product = products.find((product) => product._id === id);
    if (!product?._id) {
      console.error('Produto não encontrado ou ID inválido');
      return;
    }

    const newItem: ShopCartSchema = {
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    };
    addToCart(newItem);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data.product)) {
          setProducts(data.product);
        } else {
          console.error('Dados de produtos inválidos:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <LoadingDisplay dialogOpen={true} />;
  }

  const productsByCategory: Record<string, ProductsSchema[]> = {};
  products.forEach((product) => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  const filteredProductsByCategory: Record<string, ProductsSchema[]> = {};
  Object.keys(productsByCategory).forEach((category) => {
    const filteredProducts = productsByCategory[category].filter(
      (product) =>
        product.name.toLowerCase().startsWith(search.toLowerCase()) ||
        product.description.toLowerCase().startsWith(search.toLowerCase()),
    );
    if (filteredProducts.length > 0) {
      filteredProductsByCategory[category] = filteredProducts;
    }
  });

  return (
    <>
      <div className="fixed bottom-8 right-8 xl:top-24 xl:right-40 z-10">
        {searchOpen ? (
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar Produto"
            className="bg-white h-10 px-5 pr-4 rounded-full text-sm focus:outline-none shadow-md transition-all duration-300"
          />
        ) : (
          <button
            className="bg-white h-10 w-10 rounded-full flex justify-center items-center focus:outline-none shadow-md transition-all duration-300 transform hover:scale-110"
            onClick={() => setSearchOpen(true)}
            title="Abrir campo de pesquisa"
          >
            <Search className="text-gray-600" />
          </button>
        )}
        {/* Botão de fechar para quando o campo de pesquisa está aberto */}
        {searchOpen && (
          <button
            className="absolute top-0 right-0 m-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition-all duration-300"
            onClick={() => setSearchOpen(false)}
            title="Fechar campo de pesquisa"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="items-center justify-center">
        <div className="title text-light-textPrimary dark:text-dark-textPrimary text-center">
          Produtos
        </div>
        {Object.entries(filteredProductsByCategory).map(
          ([categoryId, categoryProducts]) => (
            <div key={categoryId}>
              <h2 className="text-lg font-semibold mb-2 mt-4">
                {categoryMapping[String(categoryId)]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {categoryProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="mt-2 p-4 rounded-lg shadow-md"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        <ScrollArea className="h-[150px] p-1">
                          {product.description}
                        </ScrollArea>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-base text-light-textSecondary dark:text-dark-textSecondary">
                      {formatPriceBR(product.price)}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-light-textPrimary dark:text-dark-textPrimary">
                      <Button
                        className="text-lg text-green-500 hover:text-green-600"
                        onClick={() =>
                          product._id && handleAddToCart(product._id)
                        }
                      >
                        <ShoppingCart className="h-6 w-6" />
                      </Button>
                      <span>{categoryMapping[product.category]}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autenticação Necessária</DialogTitle>
          </DialogHeader>
          <Alert className="border-none">
            <ShieldX className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Você precisa estar logado para adicionar itens ao carrinho.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button asChild>
              <Link href="/account-page">Ir para Login</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
