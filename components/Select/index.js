import ColoredBorder from '../ColoredBorder';

export default function Select({
  color = 'orange',
  className,
  label,
  name,
  onChange = () => {},
  options = [],
  placeholder = 'Selecciona una opción',
  value,
}) {
  return (
    <div className={className}>
      {label && (
        <label
          className="block mb-1 bg-transparent select-none whitespace-nowrap md:hidden"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <ColoredBorder color={color} className="h-10 rounded-full md:h-auto">
        <div className="flex flex-row items-center h-full overflow-hidden font-semibold text-black rounded-full">
          {label && (
            <label
              className="hidden px-2 leading-loose bg-transparent select-none md:block whitespace-nowrap"
              htmlFor={label.toLowerCase()}
            >
              {label}
            </label>
          )}
          <select
            className="w-full h-full px-2 py-1 text-white bg-black rounded-none hover:bg-slate-900/80 focus:outline-none"
            id={name}
            name={name}
            onChange={onChange}
            value={value || ''}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </ColoredBorder>
    </div>
  );
}
