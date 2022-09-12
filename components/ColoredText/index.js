const colors = {
  orange: 'from-orange-500 via-orange-600 to-rose-600',
  purple: 'from-violet-400 via-purple-400 to-violet-600',
  sky: 'from-blue-400 via-cyan-400 to-cyan-500',
};

export default function ColoredText({ bold, children, color }) {
  return (
    <span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${
        bold ? 'font-bold' : ''
      } ${colors[color]}`}
    >
      {children}
    </span>
  );
}
