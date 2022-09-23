import { useEffect, useState } from 'react';

export default function MemberItem({
  id,
  name,
  onSelect = () => {},
  selected: initialSelected = false,
}) {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const handleClick = () => {
    setSelected(true);
    onSelect(id);
  };

  return (
    <button
      onClick={handleClick}
      className={
        (selected
          ? 'bg-blue-500 hover:bg-blue-600 '
          : 'bg-orange-600 hover:bg-orange-700 ') +
        'p-1 text-white rounded-md w-fit '
      }
    >
      {name}
    </button>
  );
}
