import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import MemberItem from './MemberItem';

export default function MemberPicker({
  members,
  onSelect = () => {},
  selected: initialSelected,
}) {
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (id) => setSelected(id);

  const handleSubmit = () => {
    if (!selected) return toast.error('Selecciona un miembro');
    onSelect(selected);
  };

  return (
    <div className="flex flex-col gap-2">
      {members.map((member) => (
        <MemberItem
          key={member.id}
          {...member}
          onSelect={handleSelect}
          selected={selected === member.id}
        />
      ))}
      <Button onClick={handleSubmit}>¡Soy el miembro seleccionado!</Button>
    </div>
  );
}
