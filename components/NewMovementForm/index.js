import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { createMovement } from '../../services/movements';
import { formatInputDate } from '../../utils/dates';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import movementTypes from '../../data/movementTypes';
import MemberSelector from '../MemberSelector';

export default function NewMovementForm ({
  closeForm = () => {},
  members = [],
  onCreate = () => {}
}) {
  const {
    user: { id: userId }
  } = useAuth();
  const router = useRouter();
  const group = router.query.id;

  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [member, setMember] = useState(
    members.find((m) => m.uid === userId).id
  );
  const [payedAt, setPayedAt] = useState(formatInputDate(new Date()));
  const [type, setType] = useState('expense');
  const [participants, setParticipants] = useState(members.map((m) => m.id));

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleMemberChange = (e) => setMember(e.target.value);
  const handlePayedAtChange = (e) => setPayedAt(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !amount ||
      !description ||
      !member ||
      !payedAt ||
      !participants.length
    ) {
      return toast.warning('Rellena todos los campos');
    }

    const promise = createMovement({
      amount,
      description,
      group,
      member,
      participants,
      payedAt,
      type
    });

    toast
      .promise(promise, {
        success: 'Gasto añadido',
        error: 'Ha ocurrido un error añadiendo el gasto',
        pending: 'Añadiendo gasto...'
      })
      .then((movement) => {
        onCreate(movement);
        closeForm();
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.response.data.error || 'Error añadiendo el gasto');
      });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1>
        Nuevo {movementTypes.find((mT) => mT.id === type).name.toLowerCase()}
      </h1>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <Select
          label="Tipo"
          name="type"
          onChange={handleTypeChange}
          options={movementTypes.map((mT) => ({
            value: mT.id,
            label: mT.name
          }))}
          value={type}
        />
        <Input
          label="Descripción"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />
        <Select
          label="Pagado por"
          name="member"
          onChange={handleMemberChange}
          options={members.map((m) => ({ label: m.name, value: m.id }))}
          value={member}
        />
        <Input
          label="Cantidad"
          name="amount"
          onChange={handleAmountChange}
          selectAllOnFocus
          step="0.01"
          type="number"
          value={amount}
        />
        <Input
          label="Fecha y hora de pago"
          name="payedAt"
          onChange={handlePayedAtChange}
          type="datetime-local"
          value={payedAt}
        />
        <MemberSelector
          className="col-span-2"
          label="Participantes"
          members={members}
          participants={participants}
          onSelect={setParticipants}
        />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Button color="orange" type="submit">
          Añadir
        </Button>
        <Button color="orange" onClick={closeForm}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
