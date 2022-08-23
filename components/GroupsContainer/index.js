import Link from 'next/link';
import Button from '../Button';

export default function GroupContainer({ groups }) {
  return (
    <div className="flex flex-col w-1/3 gap-2 p-4 mx-auto border border-orange-600 rounded-lg shadow-lg">
      {groups?.length ? (
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
