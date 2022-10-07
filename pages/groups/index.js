import { useRouter } from 'next/router';
// import Typed from 'react-typed';
import Typed from '../../src/components/Typed';
import GroupContainer from '../../src/components/GroupsContainer';
import authStatus from '../../src/context/auth/status';
import Dots from '../../src/components/Loading/Dots';
import useAuth from '../../src/hooks/useAuth';

export default function GroupsPage() {
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return status !== authStatus.authenticated ? (
    <Dots />
  ) : (
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
