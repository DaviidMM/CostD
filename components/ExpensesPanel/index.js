import Button from '../Button';
import Expense from '../Expense';

export default function ExpensesPanel({ expenses }) {
  return (
    <>
      <ul className="mb-4">
        {expenses.map((expense) => {
          return <Expense key={expense.id} {...expense} />;
        })}
      </ul>
      <Button color="orange">💵 Añadir gasto</Button>
    </>
  );
}
