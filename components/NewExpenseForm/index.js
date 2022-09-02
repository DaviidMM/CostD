import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { createExpense } from '../../services/expenses';
import { formatInputDate } from '../../utils/dates';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';

export default function NewExpenseForm({
  closeForm = () => {},
  members = [],
  onCreate = () => {},
}) {
  const {
    user: { id: userId },
  } = useAuth();
  const router = useRouter();
  const group = router.query.id;

  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [member, setMember] = useState(members.find((m) => m.uid === userId));
  const [payedAt, setPayedAt] = useState(formatInputDate(new Date()));

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleMemberChange = (e) => setMember(e.target.value);
  const handlePayedAtChange = (e) => setPayedAt(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log({ amount, description, member, payedAt, group });

    if (!amount || !description || !member || !payedAt) {
      return toast.warning('Rellena todos los campos');
    }

    const promise = createExpense({
      amount,
      description,
      group,
      member,
      payedAt,
    });

    toast
      .promise(promise, {
        success: 'Gasto añadido',
        error: 'Ha ocurrido un error añadiendo el gasto',
        pending: 'Añadiendo gasto...',
      })
      .then((expense) => {
        onCreate(expense);
        closeForm();
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.response.data.error || 'Error añadiendo el gasto');
      });
  };

  console.log({ amount, description, member, payedAt });

  return (
    <form
      className="grid grid-cols-1 gap-2 md:grid-cols-2"
      onSubmit={handleSubmit}
    >
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
        options={members.map((m) => m.name)}
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
