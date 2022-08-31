import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Button from '../../Button';

export default function GroupItem({ description, expenses, id, name }) {
  return (
    <Link href="/groups/[id]" as={`/groups/${id}`}>
      <Button className="!w-full p-2 text-left transition-colors bg-orange-700 rounded-md hover:bg-orange-600 flex flex-row justify-between group">
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
            title={`Hay ${expenses.length} gastos`}
          >
            {expenses.length}
          </span>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </Button>
    </Link>
  );
}
