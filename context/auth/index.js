import { createContext, useEffect, useState } from 'react';
import LoginModal from '../../components/LoginModal';
import { checkAuthState } from '../../services/firebase/client';
import authStatus from './status';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openModal = () => {
    console.log('openModal');
    setShowLoginModal(true);
  };
  const closeModal = () => setShowLoginModal(false);

  const handleLoginGoogle = () => {
    loginWithGoogle()
      .then(() => closeModal())
      .catch((err) => console.error(err));
  };
  const handleLoginTwitter = () => {
    loginWithTwitter()
      .then(() => closeModal())
      .catch((err) => console.log(err));
  };

  const [contextValue, setContextValue] = useState({
    user: null,
    status: authStatus.loading,
    openLoginModal: openModal,
  });

  useEffect(
    () => checkAuthState(setContextValue, contextValue),
    [contextValue]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <LoginModal
        closeModal={closeModal}
        isOpen={showLoginModal}
        handleLoginGoogle={handleLoginGoogle}
        handleLoginTwitter={handleLoginTwitter}
      />
      {children}
    </AuthContext.Provider>
  );
};
