import ColoredText from '../ColoredText';

export default function Feature({
  color,
  children,
  id,
  title,
  romboid = false,
}) {
  const romboidBgs = {
    green: 'from-green-600 via-green-700 to-green-600',
    rose: 'from-rose-500 via-rose-700 to-rose-500',
    sky: 'from-sky-500 via-sky-700 to-sky-500',
  };

  return (
    <section
      className="mb-12 [&:nth-child(odd)_div.romboid]:[transform:skew(-3deg)] [&:nth-child(even)_div.romboid]:[transform:skew(3deg)]"
      id={id}
    >
      <h2 className="mb-10 text-5xl text-left">
        <ColoredText bold color={color}>
          {title}
        </ColoredText>
      </h2>
      {romboid ? (
        <div className="relative z-10 flex flex-row justify-center gap-12 p-4 group">
          <div
            className={`romboid absolute inset-0 rounded-lg bg-gradient-to-r ${romboidBgs[color]} duration-500 bg-pos-0 group-hover:bg-pos-100 bg-size-200 -z-10 transition-all  group-hover:[transform:none]`}
          ></div>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
