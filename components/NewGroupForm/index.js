import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import CategorySelector from '../CategorySelector';
import Input from '../Input';
import MembersBox from '../MembersBox';
import { nanoid } from 'nanoid';
import { createGroup } from '../../services/groups';
import { useRouter } from 'next/router';

export default function NewGroupForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([{ name: '', id: nanoid() }]);
  const router = useRouter();

  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (category) => setCategory(category);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleMembersChange = (members) => setMembers(members);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !description || members.some((m) => !m.name)) {
      return toast.warning('Rellena todos los campos');
    }

    const promise = createGroup({ name, category, description, members });

    toast
      .promise(promise, {
        success: 'Se ha creado el grupo correctamente',
        error: 'Ha ocurrido un error creando el grupo',
        pending: 'Creando grupo...',
      })
      .then((group) => {
        router.push('/groups/[id]', `/groups/${group.id}`);
      });
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 mx-auto border-2 border-orange-600 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <Input
        label="Nombre del grupo"
        value={name}
        onChange={handleNameChange}
      />
      <Input
        label="Descripción del grupo (opcional)"
        value={description}
        onChange={handleDescriptionChange}
      />
      <CategorySelector onChange={handleCategoryChange} />
      <MembersBox
        label="Miembros"
        members={members}
        setMembers={handleMembersChange}
      />
      <Button className="w-fit" color="orange" type="submit">
        Crear grupo
      </Button>
    </form>
  );
}
