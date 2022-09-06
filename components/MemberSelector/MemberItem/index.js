import ColoredBorder from '../../ColoredBorder';

export default function MemberItem({ id, name, selected, onSelect }) {
  const handleSelect = (e) => {
    onSelect(id);
  };

  return (
    <ColoredBorder
      className="inline-block mr-2 rounded-full w-fit"
      color="orange"
    >
      <button
        type="button"
        onClick={handleSelect}
        className={
          'select-none px-2 py-1 rounded-full hover:bg-transparent w-fit transition-colors font-semibold hover:text-black ' +
          (selected ? 'bg-transparent text-black' : 'bg-black text-white')
        }
      >
        {name}
      </button>
    </ColoredBorder>
  );
}
