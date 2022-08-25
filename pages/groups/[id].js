import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Group from '../../components/Group';
import Dots from '../../components/Loading/Dots';
import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import useGroup from '../../hooks/useGroup';

export default function GroupPage() {
  const { status } = useAuth();
  const router = useRouter();
  const group = useGroup(router.query.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (group && router.isReady) setLoading(false);
  }, [group, router]);

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return loading ? <Dots /> : <Group {...group} />;
}
