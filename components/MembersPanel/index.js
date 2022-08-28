import Button from '../Button';
import MembersBox from '../MembersBox';

export default function MembersPanel({ members, setMembers, updateMembers }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log({ members });
    updateMembers(members);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MembersBox className="mb-4" members={members} setMembers={setMembers} />
      <Button type="submit">Guardar miembros</Button>
    </form>
  );
}
