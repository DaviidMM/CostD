import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listenGroupMovements } from '../../services/firebase/db/client';

export default function useGroupMovements () {
  const router = useRouter();
  const { id } = router.query;
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    if (id) {
      const unsubscribe = listenGroupMovements(id, setMovements);
      return () => unsubscribe();
    }
  }, [id]);

  return [movements, setMovements];
}
