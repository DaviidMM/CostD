import { useEffect, useState } from 'react';
import { modifyMovement } from '../../../services/movements';
import Button from '../Button';
import Input from '../Input';
import { toast } from 'react-toastify';
import { formatInputDate } from '../../../utils/dates';
import Select from '../Select';
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import movementTypes from '../../data/movementTypes';
import MemberSelector from '../MemberSelector';

export default function ModifyMovementForm({
  color = 'orange',
  movement,
  members = [],
  onDelete,
  onUpdate
}) {
  const { id } = movement;
  const [amount, setAmount] = useState(movement.amount);
  const [description, setDescription] = useState(movement.description);
  const [member, setMember] = useState(movement.member);
  const [payedAt, setPayedAt] = useState(formatInputDate(movement.payedAt));
  const [type, setType] = useState(movement.type);
  const [participants, setParticipants] = useState(movement.participants);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (
      (document.activeElement.nodeName.toLowerCase() === 'input' ||
        document.activeElement.nodeName.toLowerCase() === 'select' ||
        document.activeElement.nodeName.toLowerCase() === 'button') &&
      (description !== movement.description ||
        amount !== movement.amount ||
        member !== movement.member ||
        payedAt !== formatInputDate(movement.payedAt) ||
        participants.sort().join(',') !==
          movement.participants.sort().join(',') ||
        type !== movement.type)
    ) {
      setChanged(true);
    }
  }, [description, amount, member, participants, payedAt, type, movement]);

  const handleAmountChange = (e) => setAmount(Number(e.target.value));
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleMemberChange = (e) => setMember(e.target.value);
  const handlePayedAtChange = (e) => setPayedAt(e.target.value);
  const handleTypeAtChange = (e) => setType(e.target.value);

  const handleDelete = () => onDelete(movement);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = modifyMovement({
      id,
      description,
      amount,
      member,
      participants,
      payedAt,
      type
    });

    toast
      .promise(promise, {
        success: 'Gasto modificado con éxito',
        error: 'Ha ocurrido un error modificando el gasto',
        pending: 'Actualizando gasto...'
      })
      .then((updatedMovement) => {
        const { amount, description, id, member, participants, payedAt, type } =
          updatedMovement;
        onUpdate({
          amount,
          description,
          id,
          member,
          participants,
          payedAt,
          type
        });
        setChanged(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error || 'Error inesperado');
      });
  };

  return (
    <form
      className="flex flex-col justify-between h-full text-white"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <Select
          color={color}
          label="Tipo"
          name="type"
          onChange={handleTypeAtChange}
          options={movementTypes.map((mT) => ({
            value: mT.id,
            label: mT.name
          }))}
          placeholder="Selecciona un tipo"
          value={type}
        />
        <Input
          color={color}
          label="Descripción"
          onChange={handleDescriptionChange}
          value={description}
        />
        <Input
          color={color}
          label="Cantidad"
          onChange={handleAmountChange}
          selectAllOnFocus
          step="0.01"
          type="number"
          value={amount}
        />
        <Select
          color={color}
          label="Pagado por"
          name="type"
          onChange={handleMemberChange}
          options={members.map((m) => ({ label: m.name, value: m.id }))}
          placeholder="Selecciona un miembro"
          value={member}
        />
        <Input
          color={color}
          label="Fecha de pago"
          onChange={handlePayedAtChange}
          type="datetime-local"
          value={payedAt}
        />
        <MemberSelector
          color={color}
          className="col-span-2"
          label="Participantes"
          members={members}
          participants={participants}
          onSelect={setParticipants}
        />
      </div>

      <div className="flex flex-row justify-end gap-2 mt-4">
        <Button color="red" className="py-1" onClick={handleDelete}>
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </Button>
        <Button
          disabled={!changed}
          className="px-2 py-1 w-fit"
          color={color}
          type="submit"
        >
          <ArrowDownOnSquareIcon className="w-4 h-4" />
          Guardar
        </Button>
      </div>
    </form>
  );
}
