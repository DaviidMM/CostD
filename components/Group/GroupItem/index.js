import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function GroupItem({ description, movements, id, name }) {
  return (
    <Link href="/groups/[id]" as={`/groups/${id}`}>
      <button className="!w-full font-semibold items-center p-2 text-left transition-all duration-500 bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-md flex flex-row justify-between group text-black hover:text-white">
        <div className="flex flex-col w-5/6">
          <span>{name}</span>
          <span
            className="max-w-full overflow-hidden font-light whitespace-nowrap text-ellipsis"
            title={description}
          >
            {description}
          </span>
        </div>

        <div className="flex flex-row transition-transform group-hover:translate-x-1">
          <span
            className="w-5 h-5 text-sm text-center text-orange-700 bg-orange-100 rounded-full"
            title={`Hay ${movements.length} gastos`}
          >
            {movements.length}
          </span>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </button>
    </Link>
  );
}
