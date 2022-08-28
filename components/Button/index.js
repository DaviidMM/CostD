const { forwardRef } = require('react');

const bgClasses = {
  blue: 'text-blue-900 bg-blue-100 hover:bg-blue-200 hover:text-blue-900',
  orange: 'bg-orange-500 hover:bg-orange-600 hover:text-white',
  white: 'bg-slate-200 hover:bg-slate-300',
};

const borderClasses = {
  blue: 'ring-blue-400 hover:bg-blue-300 hover:text-blue-800',
  white: '',
};

const textClasses = {
  blue: 'text-blue-400',
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
    type = 'button',
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${className} flex flex-row gap-2 items-center p-2 rounded-md focus:outline-none font-semibold transition-colors ${
        textClasses[color]
      } ${bordered ? `ring-2 ${borderClasses[color]}` : bgClasses[color]} ${
        disabled ? 'opacity-60 pointer-events-none' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
});

export default Button;
