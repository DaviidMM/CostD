import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGroup(id) {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/groups/${id}`)
        .then((res) => res.data)
        .then(setGroup);
    }
  }, [id]);

  return group;
}
