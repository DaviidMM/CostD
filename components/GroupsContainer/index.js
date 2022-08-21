import Link from 'next/link';

export default function GroupContainer({ groups }) {
  return (
    <div className="flex flex-col w-1/3 gap-2 p-4 mx-auto border border-orange-600 rounded-lg shadow-lg">
      {groups.map((group) => {
        return (
          <Link key={group.id} href="/groups/[id]" as={`/groups/${group.id}`}>
            <button className="p-2 text-left bg-orange-700 rounded-md hover:bg-orange-600">
              {group.name}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
