export default function CategoryItem({
  category,
  selectCategory = () => {},
  selected,
}) {
  const handleClick = () => selectCategory(category);

  return (
    <button
      className={
        'select-none px-2 py-1 mb-1 mr-1 border-2 border-orange-700 rounded-full hover:bg-orange-800 hover:border-orange-800 w-fit transition-colors' +
        (selected ? ' bg-orange-700' : '')
      }
      type="button"
      onClick={handleClick}
    >
      {category}
    </button>
  );
}
