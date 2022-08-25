import { createContext, useEffect, useState } from 'react';
import { checkAuthState } from '../../services/firebase/client';
import authStatus from './status';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState({
    user: null,
    status: authStatus.loading,
  });

  useEffect(() => checkAuthState(setContextValue), []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
