import axios from 'axios';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLoginMutation } from '../queries/login';

interface AuthContextType {
  authenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const existingAccessToken = localStorage.getItem('api_access_token');

  useEffect(() => {
    if (existingAccessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${existingAccessToken}`;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [authenticated, setAuthenticated] = useState(!!existingAccessToken);

  const loginMutation = useLoginMutation();

  const login = useCallback(
    async (password: string) => {
      const data = await loginMutation.mutateAsync({ password });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      localStorage.setItem('api_access_token', data.accessToken);
      setAuthenticated(true);
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('api_access_token');
    setAuthenticated(false);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({ authenticated, login, logout }),
    [authenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
