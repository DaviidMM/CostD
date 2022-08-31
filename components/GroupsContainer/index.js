import Link from 'next/link';
import useGroups from '../../hooks/useGroups';
import Button from '../Button';
import GroupItem from '../Group/GroupItem';
import Spinner from '../Loading/Spinner';

export default function GroupContainer() {
  const { groups, loading } = useGroups();

  return (
    <div className="flex flex-col w-2/3 gap-2 p-4 mx-auto border-2 border-orange-600 rounded-lg shadow-lg xl:w-2/4">
      {loading ? (
        <Spinner />
      ) : groups?.length ? (
        groups.map((group) => {
          return <GroupItem key={group.id} {...group} />;
        })
      ) : (
        <p className="text-center">No groups found</p>
      )}
      <Link href="/groups/new">
        <Button color="orange" className="w-fit">
          ➕ Crear grupo nuevo
        </Button>
      </Link>
    </div>
  );
}
