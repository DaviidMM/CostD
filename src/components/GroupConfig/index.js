import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteGroup, updateGroup } from '../../../services/groups';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';
import CategorySelector from '../CategorySelector';
import Input from '../Input';
import MembersPanel from '../MembersPanel';
import Tabs from '../Tabs';

const GroupConfigForm = ({ group }) => {
  const { user } = useAuth();
  const { id: uid } = user;
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState(group.category);
  const [fields, setFields] = useState({
    name: {
      label: 'Nombre del grupo',
      value: group.name
    },
    description: {
      label: 'Descripción (opcional)',
      value: group.description
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value
      }
    });
    setChanged(true);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setChanged(true);
  };

  const handleDeleteGroup = () => {
    if (!confirm('¿Quieres eliminar el grupo?')) return;

    const promise = deleteGroup(group);
    toast
      .promise(promise, {
        success: '¡Grupo eliminado!',
        error: '¡Ha ocurrido un error! ❌',
        pending: 'Eliminando grupo...'
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = Object.keys(fields).reduce((acc, key) => {
      acc[key] = fields[key].value;
      return acc;
    }, {});

    const promise = updateGroup(group.id, { ...formValues, category });

    return toast
      .promise(promise, {
        success: '¡Grupo actualizado! 🥳',
        error: '¡Ha ocurrido un error! ❌',
        pending: 'Actualizando grupo...'
      })
      .then(() => setChanged(false));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {Object.keys(fields).map((key) => (
        <Input
          key={key}
          label={fields[key].label}
          name={key}
          type="text"
          onChange={handleChange}
          value={fields[key].value}
        />
      ))}
      <CategorySelector onChange={handleCategoryChange} selected={category} />
      <div className="flex flex-row justify-between">
        <Button color="orange" disabled={!changed} type="submit">
          Guardar
        </Button>
        {group.creator === uid && (
          <Button color="red" onClick={handleDeleteGroup}>
            Eliminar grupo
          </Button>
        )}
      </div>
    </form>
  );
};

export default function GroupConfig({
  group,
  bindUserToMember,
  members,
  onUpdate,
  updateMembers
}) {
  const tabs = useMemo(
    () => [
      {
        label: 'Configuración',
        Component: GroupConfigForm,
        data: { group, onUpdate }
      },
      {
        label: 'Miembros',
        Component: MembersPanel,
        data: { bindUserToMember, members, updateMembers }
      }
    ],
    [members] // eslint-disable-line
  );

  return <Tabs tabs={tabs} />;
}
