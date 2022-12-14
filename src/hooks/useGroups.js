import { useEffect, useState } from 'react';
import { getGroups } from '../../services/firebase/db/client';

export default function useGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGroups()
      .then((groups) => {
        setGroups(groups);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return { groups, loading };
}
