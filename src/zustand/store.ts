import { create } from 'zustand';

interface Imagem {
  _id: string;
  productId: string;
  hash: string;
  mimetype: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: '1' | '2' | '3';
  price: number;
}

interface StoreState {
  imagens: Imagem[];
  setImagens: (imagens: Imagem[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  removeProduct: (productId: string) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const useStore = create<StoreState>((set) => ({
  imagens: [],
  setImagens: (imagens) => set({ imagens }),
  products: [],
  setProducts: (products) => set({ products }),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    })),
  currentRoute: '',
  setCurrentRoute: (route) => set({ currentRoute: route }),
}));

export default useStore;
