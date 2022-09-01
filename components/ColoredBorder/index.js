const colors = {
  orange: 'from-yellow-400 via-orange-500 to-rose-500',
};

export default function ColoredBorder({ children, className = '', color }) {
  return (
    <div
      className={`${className} w-full overflow-hidden p-0.5 bg-gradient-to-br ${colors[color]}`}
    >
      {children}
    </div>
  );
}
