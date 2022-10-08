export default function Feature({
  title,
  description,
  img = { src: '', alt: '' }
}) {
  return (
    <div className="flex flex-col justify-between gap-12 p-4 text-center transition-colors duration-300 bg-zinc-700 md:hover:bg-zinc-600 rounded-3xl">
      <div>
        <h2 className="mb-4 text-5xl font-semibold">{title}</h2>
        <p className="text-xl font-light">{description}</p>
      </div>
      {img.src && (
        <div className="mx-auto">
          <img className="h-72" src={img.src} alt={img.alt} />
        </div>
      )}
    </div>
  );
}
