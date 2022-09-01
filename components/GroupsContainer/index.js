import Link from 'next/link';
import useGroups from '../../hooks/useGroups';
import Button from '../Button';
import GroupItem from '../Group/GroupItem';
import Spinner from '../Loading/Spinner';

export default function GroupContainer() {
  const { groups, loading } = useGroups();

  return (
    <div className="flex flex-col gap-2">
      {loading ? (
        <Spinner />
      ) : groups?.length ? (
        groups.map((group) => <GroupItem key={group.id} {...group} />)
      ) : (
        <p className="text-center">
          ¡No estás en ningún grupo! Crea uno o únete a uno existente
        </p>
      )}
      <Link href="/groups/new">
        <Button color="orange" className="w-fit">
          ➕ Crear grupo nuevo
        </Button>
      </Link>
    </div>
  );
}
