import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get('/api/groups')
      .then((res) => res.data)
      .then((groups) => {
        console.log('axios', { groups });
        setGroups(groups);
      });
  }, []);

  console.log('useGroups', { groups });

  return groups;
}
