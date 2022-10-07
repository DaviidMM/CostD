import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listenGroup } from '../../services/firebase/db/client';

export default function useGroup() {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (id) {
      const unsubscribe = listenGroup(id, (updatedGroup) => {
        setGroup({ ...updatedGroup, id });
      });
      return () => unsubscribe();
    }
  }, [id]);

  return [group, setGroup];
}
