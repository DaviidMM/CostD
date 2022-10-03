export default function Switch ({ checked, description, onChange = () => {} }) {
  return (
    <button className="flex flex-row gap-2" onClick={onChange} type="button">
      <input
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={() => {}}
      />
      <div className="w-10 p-1 rounded-full transition-all duration-500 bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 bg-size-200 bg-pos-0 peer-checked:bg-pos-100 peer-checked:[&>span]:translate-x-4 [&>span]:bg-black peer-checked:[&>span]:bg-white">
        <span className="block w-4 h-4 transition-all rounded-full"></span>
      </div>
      {description}
    </button>
  );
}
