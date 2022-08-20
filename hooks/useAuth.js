import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function useAuth() {
  const user = useContext(AuthContext);

  return user;
}
