import { useRouter } from 'next/router';
// import Typed from 'react-typed';
import Typed from '../../components/Typed';
import GroupContainer from '../../components/GroupsContainer';
import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import Dots from '../../components/Loading/Dots';

export default function GroupsPage () {
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return status !== authStatus.authenticated
    ? (
    <Dots />
      )
    : (
    <div className="flex flex-col gap-4 xl:px-56">
      <h1 className="text-4xl font-semibold text-center ">
        <Typed
          bold
          gradientColor
          color="orange"
          texts={['Grupos']}
          cursor=""
          className="w-full"
        />
      </h1>
      <GroupContainer />
    </div>
      );
}
