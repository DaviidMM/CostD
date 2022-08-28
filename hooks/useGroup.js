import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGroup(id) {
  const [group, setGroup] = useState(undefined);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/groups/${id}`)
        .then((res) => res.data)
        .then((group) => {
          setGroup(group);
        })
        .catch((err) => setGroup(null));
    }
  }, [id]);

  return group;
}
