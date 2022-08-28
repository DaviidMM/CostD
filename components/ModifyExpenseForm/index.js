import { useEffect, useState } from 'react';
import { modifyExpense } from '../../services/expenses';
import Button from '../Button';
import Input from '../Input';
import { toast } from 'react-toastify';
import { formatInputDate } from '../../utils/dates';
import Select from '../Select';
import { TrashIcon } from '@heroicons/react/solid';
import { SaveIcon } from '@heroicons/react/outline';

export default function ModifyExpenseForm({
  expense,
  members = [],
  onDelete,
  onUpdate,
}) {
  const { id } = expense;
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [member, setMember] = useState(expense.member);
  const [payedAt, setPayedAt] = useState(formatInputDate(expense.payedAt));
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (
      description !== expense.description ||
      amount !== expense.amount ||
      member !== expense.member ||
      payedAt !== formatInputDate(expense.payedAt)
    ) {
      setChanged(true);
    }
  }, [description, amount, member, payedAt, expense]);

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(Number(e.target.value));
  const handleMemberChange = (e) => setMember(e.target.value);
  const handlePayedAtChange = (e) => setPayedAt(e.target.value);

  const handleDelete = () => onDelete(expense);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = modifyExpense({
      id,
      description,
      amount,
      member,
      payedAt,
    });

    toast
      .promise(promise, {
        success: 'Gasto modificado con éxito',
        error: 'Ha ocurrido un error modificando el gasto',
        pending: 'Actualizando gasto...',
      })
      .then((updatedExpense) => {
        const { description, amount, member, payedAt } = updatedExpense;
        onUpdate({
          description,
          amount,
          member,
          payedAt,
        });
        setChanged(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error || 'Error inesperado');
      });
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Descripción"
          onChange={handleDescriptionChange}
          value={description}
        />
        <Input
          label="Cantidad"
          onChange={handleAmountChange}
          selectAllOnFocus
          step="0.01"
          type="number"
          value={amount}
        />
        <Select
          label="Pagado por"
          onChange={handleMemberChange}
          options={members.map((m) => m.name)}
          placeholder="Selecciona un miembro"
          value={member}
        />
        <Input
          label="Fecha de pago"
          onChange={handlePayedAtChange}
          type="datetime-local"
          value={payedAt}
        />
      </div>

      <div className="flex flex-row justify-end gap-2">
        <Button color="red" className="py-1" onClick={handleDelete}>
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </Button>
        <Button
          disabled={!changed}
          className="px-2 py-1 w-fit"
          color="orange"
          type="submit"
        >
          <SaveIcon className="w-4 h-4" />
          Guardar
        </Button>
      </div>
    </form>
  );
}
