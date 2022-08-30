const { forwardRef } = require('react');

const bgClasses = {
  blue: 'text-blue-900 bg-blue-100 hover:bg-blue-200 hover:text-blue-900',
  orange: 'bg-orange-500 hover:bg-orange-600',
  red: 'bg-red-600 hover:bg-red-800 hover:text-white',
  white: 'bg-slate-200 hover:bg-slate-300',
};

const borderClasses = {
  blue: 'ring-blue-400 hover:bg-blue-300 hover:text-blue-800',
  red: 'ring-red-600 hover:bg-red-300 hover:text-red-800 text-red-600',
  white: '',
};

const textClasses = {
  blue: 'text-blue-400',
  red: 'text-white',
  white: 'text-black',
};

const Button = forwardRef(function Button(
  {
    bordered,
    children,
    color = 'orange',
    className = '',
    disabled,
    onClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    type = 'button',
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${className} w-fit flex flex-row gap-2 items-center p-2 rounded-md focus:outline-none font-semibold transition-colors ${
        textClasses[color]
      } ${bordered ? `ring-2 ${borderClasses[color]}` : bgClasses[color]} ${
        disabled ? 'opacity-60 pointer-events-none' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
    >
      {children}
    </button>
  );
});

export default Button;
