const colors = {
  blue: 'from-blue-500 to-blue-900',
  orange: 'from-yellow-400 via-orange-500 to-rose-500',
  green: 'from-green-500 via-green-700 to-green-600',
  purple: 'from-violet-300 to-violet-600',
  rose: 'from-rose-400 to-rose-600',
  sky: 'from-sky-300 to-sky-500',
};

const widths = {
  0.5: 'p-0.5',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
};

export default function ColoredBorder({
  children,
  className = '',
  color,
  width = '0.5',
}) {
  return (
    <div
      className={`${className} w-full overflow-hidden bg-gradient-to-b ${colors[color]} ${widths[width]}`}
    >
      {children}
    </div>
  );
}
