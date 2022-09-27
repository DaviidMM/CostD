export default function Switch({ checked, onChange = () => {} }) {
  return (
    <>
      <input type="checkbox" className="hidden peer" checked={checked} />
      <button
        className="w-10 p-1 bg-red-400 rounded-full peer-checked:bg-blue-400 peer-checked:[&>span]:translate-x-4"
        onClick={onChange}
        type="button"
      >
        <span className="block w-4 h-4 transition-transform bg-black rounded-full"></span>
      </button>
    </>
  );
}
