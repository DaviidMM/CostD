import { useEffect, useState } from 'react';
import MemberItem from './MemberItem';

export default function MemberSelector ({
  color = 'orange',
  className,
  label,
  members,
  participants,
  onSelect = () => {}
}) {
  const [selected, setSelected] = useState(participants);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((memberId) => memberId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className={(className ? className + ' ' : '') + 'flex flex-col gap-2'}>
      <label>{label}</label>
      <div>
        {members.map((member) => (
          <MemberItem
            color={color}
            key={member.id}
            {...member}
            canSelect={selected.length > 1 || !selected.includes(member.id)}
            onSelect={handleSelect}
            selected={selected.includes(member.id)}
          />
        ))}
      </div>
    </div>
  );
}
