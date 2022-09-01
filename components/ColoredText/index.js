const colors = {
  orange: 'from-orange-500 via-orange-600 to-rose-600',
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
