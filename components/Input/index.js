import ColoredBorder from '../ColoredBorder';

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
    <ColoredBorder color="orange" className="rounded-full">
      <div
        className={
          (className ? className + ' ' : '') +
          'rounded-full items-center overflow-hidden flex flex-row text-black font-semibold'
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
        <input
          className="w-full h-8 px-2 py-1 text-white bg-black focus:outline-none"
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
  );
}
