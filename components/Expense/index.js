import {
  normalizeLongDate,
  normalizeShortDate,
} from '../../utils/normalizeDates';
import ModifyExpenseForm from '../ModifyExpenseForm';

export default function Expense({
  amount,
  description,
  id,
  member,
  members,
  open,
  payedAt,
  toggleExpense,
}) {
  const longDate = normalizeLongDate(payedAt);
  const shortDate = normalizeShortDate(payedAt);

  const handleClick = () => toggleExpense(id);

  return (
    <div className="flex flex-col gap-2 ">
      <button
        onClick={handleClick}
        className={`border border-slate-300 flex flex-row justify-between w-full p-2 rounded-md hover:bg-slate-400 hover:border-slate-400 hover:shadow-md transition-colors bg-slate-300 text-black shadow-md`}
      >
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
      <div
        className={'transition-all overflow-hidden ' + (open ? 'h-44' : 'h-0')}
      >
        <div className="h-full p-2 text-black rounded-md bg-slate-300 ">
          <ModifyExpenseForm
            expense={{ amount, description, id, member, payedAt }}
            members={members}
          />
        </div>
      </div>
    </div>
  );
}
