export default function StepCard({
  className,
  title,
  description,
  image,
  step,
}) {
  return (
    <div
      className={
        (className ? className + ' ' : '') +
        (step % 2 ? 'pt-20 ' : 'pb-20 ') +
        'w-full cursor-default hover:[transform:none] relative flex p-4 flex-col z-10 group'
      }
    >
      <div
        className={
          (step % 2
            ? 'mt-12 [transform:perspective(900px)_rotateX(5deg)_translateZ(0)] '
            : 'mb-12 [transform:perspective(900px)_rotateX(-5deg)_translateZ(0)] ') +
          'absolute inset-0 transition-all -z-10 group-hover:transform-none rounded-lg duration-500 bg-gradient-to-br from-orange-600 via-orange-800 to-orange-600 bg-size-200 bg-pos-0 group-hover:bg-pos-100'
        }
      ></div>
      <span
        className={
          (step % 2 ? 'top-16 ' : 'top-3 ') +
          'absolute opacity-40 left-5 text-6xl'
        }
      >
        {step}
      </span>
      <h3 className="mb-8 text-2xl font-semibold text-center">{title}</h3>
      <p className="h-full text-justify">{description}</p>
      <img src={image.src} alt={image.alt} />
    </div>
  );
}
