const colors = {
  orange: 'from-orange-500 to-orange-700',
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
