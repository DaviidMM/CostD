import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGroup } from '../services/firebase/db/client';

export default function useGroup() {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState(undefined);

  useEffect(() => {
    if (id) {
      getGroup(id)
        .then((group) => setGroup(group))
        .catch((err) => {
          console.log({ err });
          setGroup(null);
        });
    } else {
      setGroup(null);
    }
  }, [id]);

  return group;
}
