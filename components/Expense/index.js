import { useState } from 'react';
import { normalizeLongDate, normalizeShortDate } from '../../utils/dates';
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
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [amountValue, setAmountValue] = useState(amount);
  const [memberValue, setMemberValue] = useState(member);
  const [payedAtValue, setPayedAtValue] = useState(payedAt);

  const longDate = normalizeLongDate(payedAtValue);
  const shortDate = normalizeShortDate(payedAtValue);

  const handleClick = () => toggleExpense(id);

  const handleChange = (expense) => {
    setDescriptionValue(expense.description);
    setAmountValue(expense.amount);
    setMemberValue(expense.member);
    setPayedAtValue(expense.payedAt);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <button
        onClick={handleClick}
        className={`border border-slate-300 flex flex-row justify-between w-full p-2 rounded-md hover:bg-slate-400 hover:border-slate-400 hover:shadow-md transition-colors bg-slate-300 text-black shadow-md`}
      >
        <div className="flex flex-col text-left">
          <span>
            <b>{descriptionValue}</b>
          </span>
          <span className="text-sm">
            Pagado por: <b>{memberValue}</b>
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span>
            <b>{amountValue}€</b>
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
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
