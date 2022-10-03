import { createContext, useEffect, useState } from 'react';
import usePushNotifications from '../../hooks/usePushNotifications';
import { storeFCMToken } from '../../../services/users';
import { checkAuthState } from '../../../services/firebase/client';
import authStatus from './status';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState({
    user: null,
    status: authStatus.loading
  });
  const FCMToken = usePushNotifications();

  useEffect(() => checkAuthState(setContextValue), []);

  useEffect(() => {
    // When user is authenticated and FCM token is generated, add token to user's devices
    if (FCMToken && contextValue.status === authStatus.authenticated) {
      storeFCMToken(FCMToken).catch((err) => {
        console.error(err);
        toast.error('Ha ocurrido un error en el servidor');
      });
    }
  }, [FCMToken, contextValue]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
