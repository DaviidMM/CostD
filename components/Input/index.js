export default function Input({
  className = '',
  label,
  name,
  value,
  onChange = () => {},
  step = '1',
  type = 'text',
}) {
  return (
    <div className={(className ? className + ' ' : '') + 'flex flex-col'}>
      {label && (
        <label className="select-none" htmlFor={label.toLowerCase()}>
          {label}
        </label>
      )}
      <input
        className="px-2 py-1 text-white rounded-md"
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        step={type === 'datetime-local' ? '60' : step}
        name={name}
      />
    </div>
  );
}
