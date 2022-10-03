import { useContext } from 'react';
import { LoginModalContext } from '../context/loginModal';

export const useLoginModal = () => {
  const { openLoginModal, closeLoginModal } = useContext(LoginModalContext);

  return {
    openLoginModal,
    closeLoginModal
  };
};
