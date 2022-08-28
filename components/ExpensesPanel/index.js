import { useState } from 'react';
import Button from '../Button';
import Expense from '../Expense';

export default function ExpensesPanel({ expenses, members = [] }) {
  const [active, setActive] = useState(null);

  const toggleExpense = (expense) => {
    if (active === expense) return setActive(null);
    setActive(expense);
  };

  return (
    <div>
      <ul className="flex flex-col gap-2 mb-4">
        {expenses.map((expense) => {
          return (
            <Expense
              key={expense.id}
              {...expense}
              open={expense.id === active}
              toggleExpense={toggleExpense}
              members={members}
            />
          );
        })}
      </ul>
      <Button color="orange">💵 Añadir gasto</Button>
    </div>
  );
}
