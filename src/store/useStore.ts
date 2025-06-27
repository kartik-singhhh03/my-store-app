import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  downloadUrl?: string;
  rating: number;
  reviews: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  duration: string;
  rating: number;
  reviews: number;
}

interface CartItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Store {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Products & Services
  products: Product[];
  services: Service[];
  setProducts: (products: Product[]) => void;
  setServices: (services: Service[]) => void;

  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markAsRead: (messageId: string) => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      register: (user) => set({ user, isAuthenticated: true }),

      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      get cartTotal() {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Products & Services
      products: [],
      services: [],
      setProducts: (products) => set({ products }),
      setServices: (services) => set({ services }),

      // Messages
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
          ],
        })),
      markAsRead: (messageId) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, read: true } : msg
          ),
        })),

      // UI State
      sidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'kartik-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
      }),
    }
  )
);