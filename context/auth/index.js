import { createContext, useEffect, useState } from 'react';
import { checkAuthState } from '../../services/firebase/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    checkAuthState(setAuth);
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
