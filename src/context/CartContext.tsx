import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem, Product, PackFormat } from '../types';
import type { Client } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, contractProduct: Client['contractProducts'][0], packFormat: PackFormat, quantity: number) => void;
  updateQuantity: (productId: string, packFormat: PackFormat, quantity: number) => void;
  removeItem: (productId: string, packFormat: PackFormat) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  vatAmount: number;
  total: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const VAT_RATE = 0.2;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, contractProduct: Client['contractProducts'][0], packFormat: PackFormat, quantity: number) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.packFormat === packFormat
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.packFormat === packFormat
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, contractProduct, packFormat, quantity }];
      });
      setCartOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((productId: string, packFormat: PackFormat, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.packFormat === packFormat)));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.packFormat === packFormat ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: string, packFormat: PackFormat) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.packFormat === packFormat)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemPrice = (item: CartItem): number => {
    const { contractProduct, packFormat, quantity } = item;
    const unitPrice =
      packFormat === 'unit'
        ? contractProduct.price.unit
        : packFormat === 'box'
        ? contractProduct.price.box
        : contractProduct.price.carton;
    return unitPrice * quantity;
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + getItemPrice(i), 0);
  const vatAmount = subtotal * VAT_RATE;
  const total = subtotal + vatAmount;

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, subtotal, vatAmount, total, isCartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
