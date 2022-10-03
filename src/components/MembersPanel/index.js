import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import MembersBox from '../MembersBox';

export default function MembersPanel ({
  bindUserToMember,
  members,
  setMembers,
  updateMembers
}) {
  const [changed, setChanged] = useState(false);

  const handleSetMembers = (members) => {
    setChanged(true);
    setMembers(members);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (members.some((m) => !m.name)) {
      return toast.warning('Todos los miembros deben tener un nombre');
    }
    // Check if all members name is different
    const allNamesAreDifferent = members.every(
      (m, idx) => members.findIndex((m2) => m2.name === m.name) === idx
    );
    if (!allNamesAreDifferent) {
      return toast.warning(
        'Todos los miembros deben tener un nombre diferente'
      );
    }

    updateMembers(members).then(() => setChanged(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <MembersBox
        bindUserToMember={bindUserToMember}
        className="mb-4"
        members={members}
        setMembers={handleSetMembers}
      />
      <Button disabled={!changed} type="submit">
        Guardar miembros
      </Button>
    </form>
  );
}
