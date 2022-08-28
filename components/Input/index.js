export default function Input({
  className = '',
  label,
  name,
  onChange = () => {},
  selectAllOnFocus = false,
  step = '1',
  type = 'text',
  value,
}) {
  const handleFocus = (e) => e.target.select();

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
        onFocus={selectAllOnFocus ? handleFocus : () => {}}
        step={type === 'datetime-local' ? '60' : step}
        name={name}
      />
    </div>
  );
}
