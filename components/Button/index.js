const { forwardRef } = require('react');

const bgClasses = {
  blue: 'text-blue-900 bg-blue-100 hover:bg-blue-200 hover:text-blue-900',
  default: 'bg-slate-300 hover:bg-slate-200',
  orange: 'bg-orange-500 hover:bg-orange-600 hover:text-white',
  white: 'bg-slate-200 hover:bg-slate-300',
};

const borderClasses = {
  blue: 'ring-blue-400 hover:bg-blue-300 hover:text-blue-800',
  default: 'ring-slate-500',
  white: '',
};

const textClasses = {
  blue: 'text-blue-400',
  default: 'text-slate-500',
  white: 'text-black',
};

const Button = forwardRef(function Button(
  { bordered, children, color = 'default', className = '', onClick = () => {} },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${className} flex flex-row gap-2 items-center p-2 rounded-md focus:outline-none font-semibold transition-colors ${
        textClasses[color]
      } ${bordered ? `ring-2 ${borderClasses[color]}` : bgClasses[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
