import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { updateGroup } from '../../services/groups';
import Button from '../Button';
import CategorySelector from '../CategorySelector';
import Input from '../Input';
import MembersPanel from '../MembersPanel';
import Tabs from '../Tabs';

const Form = ({ group, onUpdate }) => {
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState(group.category);
  const [fields, setFields] = useState({
    name: {
      label: 'Nombre del grupo',
      value: group.name,
    },
    description: {
      label: 'Descripción (opcional)',
      value: group.description,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value,
      },
    });
    setChanged(true);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = Object.keys(fields).reduce((acc, key) => {
      acc[key] = fields[key].value;
      return acc;
    }, {});
    return updateGroup(group.id, { ...formValues, category }).then(
      (updatedGroup) => {
        onUpdate(updatedGroup);
        toast.success('¡Grupo actualizado! 🥳');
        setChanged(false);
      }
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {Object.keys(fields).map(
        (key) =>
          key !== 'category' && (
            <Input
              key={key}
              label={fields[key].label}
              name={key}
              type="text"
              onChange={handleChange}
              value={fields[key].value}
            />
          )
      )}
      <CategorySelector onChange={handleCategoryChange} selected={category} />
      <Button color="orange" disabled={!changed} type="submit">
        Guardar
      </Button>
    </form>
  );
};

export default function GroupConfig({
  group,
  members,
  onUpdate,
  setMembers,
  updateMembers,
}) {
  const tabs = useMemo(
    () => [
      {
        label: 'Configuración',
        Component: Form,
        data: { group, onUpdate },
      },
      {
        label: 'Miembros',
        Component: MembersPanel,
        data: { members, setMembers, updateMembers },
      },
    ],
    [members] // eslint-disable-line
  );

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}
