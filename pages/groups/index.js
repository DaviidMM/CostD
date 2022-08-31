import { useRouter } from 'next/router';
// import Typed from 'react-typed';
import Typed from '../../components/Typed';
import GroupContainer from '../../components/GroupsContainer';
import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';

export default function GroupsPage() {
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return (
    <div>
      <h1 className="my-4 text-3xl font-semibold text-center">
        <Typed bold colored color="orange" text="Grupos" cursor="" />
      </h1>
      <GroupContainer />
    </div>
  );
}
