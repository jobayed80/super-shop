import { create } from 'zustand';

interface StoreState {
  cartProduct: any[];
  favoriteProduct: any[];
  currentUser: any;
  isLoggedIn: boolean;
  role: string;
  login: (path: string) => void;
  logout: () => void;
}

const useStore = create<StoreState>((set) => ({
  cartProduct: [],
  favoriteProduct: [],
  currentUser: null,
  isLoggedIn: false,
  role: '',
  login: (path) => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export const store = useStore;