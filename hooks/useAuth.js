import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import authStatus from '../context/auth/status';

export default function useAuth() {
  const user = useContext(AuthContext);
  const [status, setStatus] = useState(authStatus.loading);

  useEffect(() => {
    if (user) {
      setStatus(authStatus.authenticated);
    } else {
      setStatus(authStatus.unauthenticated);
    }
  }, [user]);

  return { user, status };
}
