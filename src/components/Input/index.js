import ColoredBorder from '../ColoredBorder';

export default function Input ({
  color = 'orange',
  className = '',
  label,
  name,
  onChange = () => {},
  selectAllOnFocus = false,
  step = '1',
  type = 'text',
  value
}) {
  const handleFocus = (e) => e.target.select();

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
      <ColoredBorder color={color} className="h-10 rounded-xl md:h-full">
        <div className="flex flex-row items-center w-full h-full overflow-hidden font-semibold text-black rounded-xl">
          {label && (
            <label
              className="hidden px-2 leading-loose bg-transparent select-none whitespace-nowrap md:block"
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <input
            className="w-full h-full px-2 py-1 text-white bg-black md:h-auto focus:outline-none"
            id={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={selectAllOnFocus ? handleFocus : () => {}}
            step={type === 'datetime-local' ? '60' : step}
            name={name}
          />
        </div>
      </ColoredBorder>
    </div>
  );
}
