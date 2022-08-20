const bgClasses = {
  blue: 'text-blue-900 bg-blue-100 hover:bg-blue-200 hover:text-blue-900',
  white: 'bg-slate-200 hover:bg-slate-300',
  default: 'bg-slate-300 hover:bg-slate-200',
};

const borderClasses = {
  blue: 'ring-blue-400 hover:bg-blue-300 hover:text-blue-800',
  white: '',
  default: 'ring-slate-500',
};

const textClasses = {
  blue: 'text-blue-400',
  white: 'text-black',
  default: 'text-slate-500',
};

export default function Button({
  bordered,
  children,
  color = 'default',
  className = '',
  onClick = () => {},
}) {
  return (
    <button
      className={`${className} flex flex-row gap-2 items-center p-2 rounded-md focus:outline-none font-semibold ${
        textClasses[color]
      } ${bordered ? `ring-2 ${borderClasses[color]}` : bgClasses[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
