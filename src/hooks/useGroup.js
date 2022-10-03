import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { listenGroup } from '../../services/firebase/db/client';

export default function useGroup () {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState(undefined);

  useEffect(() => {
    if (id) {
      listenGroup(id, (updatedGroup) => {
        console.log({ updatedGroup });
        setGroup((prevGroup) => ({ ...prevGroup, ...updatedGroup, id }));
      });
    } else {
      setGroup(null);
    }
  }, [id]);

  return [group, setGroup];
}
