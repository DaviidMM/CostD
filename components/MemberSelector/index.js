import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import MemberItem from './MemberItem';

export default function MemberSelector({ members, selected: initialSelected }) {
  const [selected, setSelected] = useState(initialSelected);

  const onSelect = (id) => setSelected(id);

  const handleSubmit = () => {
    console.log('Submit');
    if (!selected) {
      return toast.error('Selecciona un miembro');
    }

    console.log(
      'Añadir el id del usuario logeado al campo uid del miembro al que se vincule'
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {members.map((member) => (
        <MemberItem
          key={member.id}
          {...member}
          onSelect={onSelect}
          selected={selected === member.id}
        />
      ))}
      <Button onClick={handleSubmit}>¡Soy el miembro seleccionado!</Button>
    </div>
  );
}
