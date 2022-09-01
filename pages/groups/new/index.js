import { useRouter } from 'next/router';
import NewGroupForm from '../../../components/NewGroupForm';
import Typed from '../../../components/Typed';
import authStatus from '../../../context/auth/status';
import useAuth from '../../../hooks/useAuth';

export default function NewGroupPage() {
  const { status } = useAuth();
  const router = useRouter();

  if (status === authStatus.unauthenticated) {
    router.push('/');
  }

  return (
    <div>
      <h1 className="my-4 text-3xl font-semibold text-center">
        <Typed
          bold
          gradientColor
          color="orange"
          text="Crear nuevo grupo"
          cursor=""
        />
      </h1>
      <NewGroupForm />
    </div>
  );
}
