import ColoredBorder from '../ColoredBorder';

export default function Select({
  className,
  label,
  name,
  onChange = () => {},
  options = [],
  placeholder = 'Selecciona una opción',
  value,
}) {
  return (
    <ColoredBorder color="orange" className="rounded-full">
      <div
        className={
          (className ? className + ' ' : '') +
          'items-center overflow-hidden h-full rounded-full flex flex-row text-black font-semibold'
        }
      >
        {label && (
          <label
            className="px-2 leading-loose bg-transparent select-none whitespace-nowrap"
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
  );
}
