export default function Select({
  label,
  name,
  onChange = () => {},
  options = [],
  placeholder = 'Selecciona una opción',
  value,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="member">{label}</label>
      <select
        className="px-2 py-1 text-white rounded-md"
        id="member"
        value={value || ''}
        name={name}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
