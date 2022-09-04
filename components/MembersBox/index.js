import { PlusIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';
import MemberItem from './MemberItem';

export default function MembersBox({
  actions = true,
  bindUserToMember,
  className,
  label = '',
  members = [],
  setMembers = () => {},
}) {
  const {
    user: { id: userId },
  } = useAuth();
  const addMember = () => {
    setMembers([...members, { name: '', id: nanoid(), isNew: true }]);
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
    <div className={(className ? className + ' ' : '') + 'flex flex-col gap-2'}>
      {label && <label>{label}</label>}
      <div className="flex flex-col gap-4 mb-4">
        {members.map((member, idx) => (
          <MemberItem
            id={member.id}
            isNew={member.isNew}
            key={idx}
            actions={actions && members.length > 1 && member.uid !== userId}
            name={member.name}
            onBind={bindUserToMember}
            onChange={handleMemberChange}
            onDelete={removeMember}
          />
        ))}
      </div>
      <Button color="orange" onClick={addMember}>
        <PlusIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}
