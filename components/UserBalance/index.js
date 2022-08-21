export default function UserBalance({ balance, user }) {
  console.log({ balance, user });

  return (
    <div className="flex flex-row justify-between">
      <span className="flex-grow pr-4 text-right">{user}</span>
      <div className="w-80 bg-slate-300">{balance}€</div>
    </div>
  );
}
