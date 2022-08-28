import Link from 'next/link';
import useGroups from '../../hooks/useGroups';
import Button from '../Button';
import Spinner from '../Loading/Spinner';

export default function GroupContainer() {
  const { groups, loading } = useGroups();

  return (
    <div className="flex flex-col w-1/3 gap-2 p-4 mx-auto border-2 border-orange-600 rounded-lg shadow-lg">
      {loading ? (
        <Spinner />
      ) : groups?.length ? (
        groups.map((group) => {
          return (
            <Link key={group.id} href="/groups/[id]" as={`/groups/${group.id}`}>
              <button className="p-2 text-left transition-colors bg-orange-700 rounded-md hover:bg-orange-600">
                {group.name}
              </button>
            </Link>
          );
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
