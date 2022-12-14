import { useEffect, useState } from 'react';
import { getUserPrefs } from '../../services/users';
import useAuth from './useAuth';

export default function useUserPrefs() {
  const { user } = useAuth();
  const [userPrefs, setUserPrefs] = useState(null);

  useEffect(() => {
    if (user)
      getUserPrefs().then((response) =>
        setUserPrefs(response.preferences || {})
      );
  }, [user]);

  const handlePrefChange = (preference, value) => {
    setUserPrefs((prev) => ({
      ...prev,
      [preference]: { ...prev[preference], value }
    }));
  };

  return [userPrefs, handlePrefChange];
}
