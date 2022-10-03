import { toast } from 'react-toastify';
import ColoredBorder from '../../ColoredBorder';

export default function MemberItem ({
  canSelect,
  color = 'orange',
  id,
  name,
  selected,
  onSelect
}) {
  const handleSelect = (e) => {
    if (!canSelect) return toast.warning('Debe haber al menos un participante');
    onSelect(id);
  };

  return (
    <ColoredBorder className="inline-block mr-2 rounded-xl w-fit" color={color}>
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
