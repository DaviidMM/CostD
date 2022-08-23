import axios from 'axios';
import { useRouter } from 'next/router';
import ColoredText from '../../components/ColoredText';
import GroupContainer from '../../components/GroupsContainer';
import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import useGroups from '../../hooks/useGroups';

export default function GroupsPage() {
  const { status } = useAuth();
  const router = useRouter();
  const groups = useGroups();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return (
    <div>
      <h1 className="my-4 text-3xl font-semibold text-center">
        Estos son tus{' '}
        <ColoredText color="orange" bold>
          grupos
        </ColoredText>
      </h1>
      <GroupContainer groups={groups} />
    </div>
  );
}
