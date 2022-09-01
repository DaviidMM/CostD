import { PlusIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';
import Button from '../Button';
import MemberItem from './MemberItem';

export default function MembersBox({
  className,
  label = '',
  members = [],
  setMembers = () => {},
}) {
  const addMember = () => {
    setMembers([...members, { name: '', id: nanoid() }]);
  };

  const handleMemberChange = (member) => {
    const { id, name } = member;
    const newMembers = members.map((member) => {
      if (member.id === id) member.name = name;
      return member;
    });
    setMembers(newMembers);
  };

  const removeMember = (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
  };

  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <div className="flex flex-col gap-4 mb-4">
        {members.map((member, idx) => (
          <MemberItem
            id={member.id}
            key={idx}
            canDelete={members.length > 1}
            name={member.name}
            onChange={handleMemberChange}
            onDelete={removeMember}
          />
        ))}
      </div>
      <Button color="orange" onClick={addMember}>
        <PlusIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
