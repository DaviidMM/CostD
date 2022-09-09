export default function Debt({ from, to, amount }) {
  return (
    <div className="p-2 border-2 border-orange-600 rounded-md w-fit">
      {to.name} debe a {from.name} {amount}
    </div>
  );
}
