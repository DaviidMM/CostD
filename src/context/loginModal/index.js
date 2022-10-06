import { createContext, useState } from 'react';
import LoginModal from '../../components/LoginModal';
import {
  loginWithGoogle,
  loginWithTwitter
} from '../../../services/firebase/client';

export const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLoginGoogle = () => {
    loginWithGoogle()
      .then(() => closeLoginModal())
      .catch(console.error);
  };
  const handleLoginTwitter = () => {
    loginWithTwitter()
      .then(() => closeLoginModal())
      .catch(console.error);
  };

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      <LoginModal
        closeLoginModal={closeLoginModal}
        isOpen={showLoginModal}
        handleLoginGoogle={handleLoginGoogle}
        handleLoginTwitter={handleLoginTwitter}
      />
      {children}
    </LoginModalContext.Provider>
  );
};
