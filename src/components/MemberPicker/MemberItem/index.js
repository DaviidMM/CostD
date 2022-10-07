import { useEffect, useState } from 'react';
import ColoredBorder from '../../ColoredBorder';

export default function MemberItem({
  id,
  name,
  onSelect = () => {},
  selected: initialSelected = false
}) {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const handleSelect = () => {
    setSelected(true);
    onSelect(id);
  };

  return (
    <ColoredBorder
      className="inline-block mr-2 rounded-xl w-fit"
      color="orange"
    >
      <button
        type="button"
        onClick={handleSelect}
        className={
          'select-none px-2 py-1 rounded-xl md:hover:bg-transparent w-fit transition-colors font-semibold md:hover:text-black ' +
          (selected ? 'bg-transparent text-black' : 'bg-black text-white')
        }
      >
        {name}
      </button>
    </ColoredBorder>
  );
}
