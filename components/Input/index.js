export default function Input({
  label,
  value,
  onChange = () => {},
  step = '1',
  type = 'text',
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        className="px-2 py-1 text-white rounded-md"
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        step={type === 'datetime-local' ? '60' : step}
      />
    </div>
  );
}
