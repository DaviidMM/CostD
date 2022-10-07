const colors = {
  blue: 'from-blue-400 to-blue-600',
  darkorange: 'from-orange-400 to-orange-600',
  darkpurple: 'from-purple-800 to-purple-600',
  darkred: 'from-red-800 to-red-600',
  green: 'from-green-400 to-green-600',
  orange: 'from-orange-500 to-rose-600',
  purple: 'from-violet-300 to-violet-600',
  rose: 'from-rose-400 to-rose-600',
  sky: 'from-sky-300 to-sky-500',
  yellow: 'from-yellow-400 to-yellow-600'
};

export default function ColoredText({ bold, children, color = 'orange' }) {
  return (
    <span
      className={`bg-gradient-to-b bg-clip-text text-transparent ${
        bold ? 'font-bold ' : ''
      }${colors[color]}`}
    >
      {children}
    </span>
  );
}
