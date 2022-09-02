import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '../../Button';
import Input from '../../Input';

export default function MemberItem({
  canDelete,
  id,
  name,
  onBind = () => {},
  onChange = () => {},
  onDelete = () => {},
}) {
  const handleChange = (e) => {
    const { value: name } = e.target;
    onChange({ name, id });
  };

  const handleBind = () => onBind(id);

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
        <div className="flex flex-row gap-4">
          <Button
            className="py-1 whitespace-nowrap"
            color="orange"
            onClick={handleBind}
          >
            ¡Soy yo!
          </Button>
          <Button color="red" onClick={handleRemove}>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
