import { XIcon } from '@heroicons/react/outline';
import Button from '../../Button';
import Input from '../../Input';

export default function MemberItem({
  canDelete,
  id,
  name,
  onChange = () => {},
  onDelete = () => {},
}) {
  const handleChange = (e) => {
    const { value: name } = e.target;
    onChange({ name, id });
  };

  const handleRemove = () => onDelete(id);

  return (
    <div className="flex flex-row justify-between w-full gap-4">
      <Input
        name="name"
        className="w-full"
        onChange={handleChange}
        value={name}
      />
      {canDelete && (
        <Button color="red" onClick={handleRemove}>
          <XIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
