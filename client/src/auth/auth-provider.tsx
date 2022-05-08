import axios from 'axios';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useLoginMutation } from '../queries/login';

interface AuthContextType {
  authenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const existingAccessToken = localStorage.getItem('api_access_token');

  // Need to perform this as a side effect,
  // but if we do it with useEffect it will leave children with no token for their initial effects
  useMemo(() => {
    if (existingAccessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${existingAccessToken}`;
    }
  }, [existingAccessToken]);

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
