export default function ExpensesPanel({ data: expenses }) {
  return (
    <div>
      {expenses.map((expense) => {
        return (
          <div key={expense.id} className="p-1 rounded-md hover:bg-slate-200">
            {expense.description} - {expense.amount}€
          </div>
        );
      })}
    </div>
  );
}
