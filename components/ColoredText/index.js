const colors = {
  blue: 'from-blue-600 via-blue-500 to-blue-600',
  orange: 'from-orange-500 via-orange-600 to-rose-600',
  purple: 'from-violet-400 via-purple-400 to-violet-600',
  sky: 'from-sky-500 via-sky-400 to-sky-300',
};

export default function ColoredText({ bold, children, color }) {
  return (
    <span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${
        bold ? 'font-bold ' : ''
      }${colors[color]}`}
    >
      {children}
    </span>
  );
}
