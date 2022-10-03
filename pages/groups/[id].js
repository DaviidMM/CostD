import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Group from '../../src/components/Group';
import Dots from '../../src/components/Loading/Dots';
import authStatus from '../../src/context/auth/status';
import useAuth from '../../src/hooks/useAuth';
import useGroup from '../../src/hooks/useGroup';

export default function GroupPage () {
  console.log('GroupPage render');
  const { status } = useAuth();
  const router = useRouter();
  const group = useGroup();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (group && router.isReady) setLoading(false);
    if (group === null) router.push('/');
  }, [group, router]);

  if (status === authStatus.unauthenticated) router.push('/');

  return loading ? <Dots /> : <Group {...group} />;
}
