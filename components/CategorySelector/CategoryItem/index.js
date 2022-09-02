import ColoredBorder from '../../ColoredBorder';

export default function CategoryItem({
  category,
  className,
  selectCategory = () => {},
  selected,
}) {
  const handleClick = () => selectCategory(category);

  return (
    <ColoredBorder
      className="inline-block mr-2 rounded-full w-fit"
      color="orange"
    >
      <button
        className={
          (className ? className + ' ' : '') +
          'select-none px-2 py-1 rounded-full hover:bg-transparent w-fit transition-colors font-semibold hover:text-black ' +
          (selected ? 'bg-transparent text-black' : 'bg-black text-white')
        }
        type="button"
        onClick={handleClick}
      >
        {category}
      </button>
    </ColoredBorder>
  );
}
