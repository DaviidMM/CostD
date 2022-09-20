import ColoredText from '../ColoredText';

export default function Feature({
  color,
  children,
  id,
  img = { src: '', alt: '' },
  imagePosition = 'right',
  title,
  romboid = false,
}) {
  const romboidBgs = {
    green: 'from-green-600 via-green-700 to-green-600',
    purple: 'from-purple-600 via-purple-800 to-purple-600',
    rose: 'from-rose-500 via-rose-700 to-rose-500',
    sky: 'from-sky-500 via-sky-700 to-sky-500',
  };

  const Content = () => (
    <div
      className={
        'flex ' +
        (imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse') +
        ' flex-col gap-12'
      }
    >
      {children}
      {img.src && (
        <div className="image">
          <img className="w-full h-64" src={img.src} alt={img.alt} />
        </div>
      )}
    </div>
  );

  return (
    <section
      className="mb-12 md:[&:nth-child(odd)_div.romboid]:[transform:skew(-3deg)] md:[&:nth-child(even)_div.romboid]:[transform:skew(3deg)]"
      id={id}
    >
      <h2 className="mb-10 text-5xl text-center md:text-left">
        <ColoredText bold color={color}>
          {title}
        </ColoredText>
      </h2>
      {romboid ? (
        <div className="relative z-10 p-4 group">
          <div
            className={`romboid absolute inset-0 rounded-lg bg-gradient-to-r ${romboidBgs[color]} duration-500 bg-pos-0 md:group-hover:bg-pos-100 bg-size-200 -z-10 transition-all md:group-hover:[transform:none]`}
          ></div>
          <Content />
        </div>
      ) : (
        <Content />
      )}
    </section>
  );
}
