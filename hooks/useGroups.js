import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/groups')
      .then((res) => res.data)
      .then((groups) => {
        setGroups(groups);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  console.log('useGroups', { groups });

  return { groups, loading };
}
