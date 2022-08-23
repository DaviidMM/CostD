import Link from 'next/link';
import {
  normalizeLongDate,
  normalizeShortDate,
} from '../../utils/normalizeDates';

export default function Expense({ description, amount, member, payedAt }) {
  const longDate = normalizeLongDate(payedAt);
  const shortDate = normalizeShortDate(payedAt);
  return (
    <Link href="#">
      <button className="flex flex-row justify-between w-full p-2 rounded-md hover:bg-orange-200 hover:shadow-md">
        <div className="flex flex-col text-left">
          <span>
            <b>{description}</b>
          </span>
          <span className="text-sm">
            Pagado por: <b>{member}</b>
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span>
            <b>{amount}€</b>
          </span>
          <span className="hidden text-sm md:block">{longDate}</span>
          <span className="block text-sm md:hidden">{shortDate}</span>
        </div>
      </button>
    </Link>
  );
}
