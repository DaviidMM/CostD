import { useRouter } from 'next/router';
import NewGroupForm from '../../../src/components/NewGroupForm';
import Typed from '../../../src/components/Typed';
import authStatus from '../../../src/context/auth/status';
import useAuth from '../../../src/hooks/useAuth';

export default function NewGroupPage () {
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return (
    <div className="md:px-56">
      <h1 className="my-4 text-3xl font-semibold text-center">
        <Typed
          bold
          gradientColor
          color="orange"
          texts={['Crear nuevo grupo']}
          cursor=""
        />
      </h1>
      <NewGroupForm />
    </div>
  );
}
