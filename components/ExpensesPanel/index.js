import { useState } from 'react';
import Button from '../Button';
import Expense from '../Expense';
import NewExpenseForm from '../NewExpenseForm';

export default function ExpensesPanel(expense) {
  const { expenses: initialExpenses, members } = expense;

  const [expenses, setExpenses] = useState(initialExpenses);
  const [active, setActive] = useState(null);
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const removeExpense = (expense) => {
    setExpenses(expenses.filter((e) => e.id !== expense.id));
  };

  const toggleExpense = (expense) => {
    if (active === expense) return setActive(null);
    setActive(expense);
  };

  return (
    <div>
      {showNewExpenseForm ? (
        <NewExpenseForm
          onCreate={addExpense}
          closeForm={() => setShowNewExpenseForm(false)}
          members={members}
        />
      ) : (
        <>
          <ul className="flex flex-col gap-2 mb-4">
            {expenses.map((expense) => {
              return (
                <Expense
                  key={expense.id}
                  {...expense}
                  members={members}
                  onDelete={removeExpense}
                  open={expense.id === active}
                  toggleExpense={toggleExpense}
                />
              );
            })}
          </ul>
          <Button
            className="mt-4"
            color="orange"
            onClick={() => setShowNewExpenseForm(true)}
          >
            💵 Añadir gasto
          </Button>
        </>
      )}
    </div>
  );
}
