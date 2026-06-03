import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Client } from '../types';
import { getClientByCode } from '../data/clients';

interface AuthContextType {
  client: Client | null;
  isLoggedIn: boolean;
  login: (code: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isProductInContract: (productId: string) => boolean;
  getContractProduct: (productId: string) => Client['contractProducts'][0] | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client | null>(null);

  const login = useCallback((code: string, password: string) => {
    const found = getClientByCode(code, password);
    if (found) {
      setClient(found);
      return { success: true };
    }
    return { success: false, error: 'Invalid client code or password.' };
  }, []);

  const logout = useCallback(() => {
    setClient(null);
  }, []);

  const isProductInContract = useCallback(
    (productId: string) => {
      if (!client) return false;
      return client.contractProducts.some((cp) => cp.productId === productId);
    },
    [client]
  );

  const getContractProduct = useCallback(
    (productId: string) => {
      if (!client) return undefined;
      return client.contractProducts.find((cp) => cp.productId === productId);
    },
    [client]
  );

  return (
    <AuthContext.Provider
      value={{ client, isLoggedIn: !!client, login, logout, isProductInContract, getContractProduct }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
