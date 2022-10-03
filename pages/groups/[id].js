import { useRouter } from 'next/router';
import Group from '../../src/components/Group';
import Dots from '../../src/components/Loading/Dots';
import authStatus from '../../src/context/auth/status';
import useAuth from '../../src/hooks/useAuth';

export default function GroupPage () {
  console.log('GroupPage render');
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) router.push('/');

  return status !== authStatus.authenticated ? <Dots /> : <Group />;
}
