const { forwardRef } = require('react');

const bgClasses = {
  blue: 'text-blue-900 bg-blue-100 hover:bg-blue-200 hover:text-blue-900',
  orange:
    'bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 bg-size-200 bg-pos-0 hover:bg-pos-100',
  red: 'bg-red-600 hover:bg-red-800 hover:text-white',
  white: 'bg-slate-200 hover:bg-slate-300',
  black: 'bg-gradient-to-r from-slate-800 to-slate-700 hover:to-slate-800',
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
  black: 'text-white',
  orange: 'text-black hover:text-white',
};

const Button = forwardRef(function Button(
  {
    bordered,
    children,
    color = 'black',
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
      className={`${className} w-fit flex flex-row gap-2 items-center p-2 rounded-md focus:outline-none font-semibold transition-all duration-500 ${
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
