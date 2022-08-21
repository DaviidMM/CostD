export default function Expense({ expense }) {
  return (
    <div>
      <h3>Expense</h3>
      <p>{expense.description}</p>
    </div>
  );
}
