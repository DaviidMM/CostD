import { useEffect, useState } from 'react';
import { modifyExpense } from '../../services/expenses';
import Button from '../Button';
import Input from '../Input';
import { toast } from 'react-toastify';
import { formatInputDate } from '../../utils/dates';

export default function ModifyExpenseForm({ expense, members = [], onChange }) {
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
  }, [description, amount, member, payedAt]);

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(Number(e.target.value));
  const handleMemberChange = (e) => setMember(e.target.value);
  const handlePayedAtChange = (e) => setPayedAt(e.target.value);

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
        onChange({
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
          value={description}
          onChange={handleDescriptionChange}
        />
        <Input
          type="number"
          label="Cantidad"
          value={amount}
          onChange={handleAmountChange}
          step="0.01"
        />
        <div className="flex flex-col">
          <label htmlFor="member">Miembro</label>
          <select
            className="px-2 py-1 text-white rounded-md"
            id="member"
            value={member}
            onChange={handleMemberChange}
          >
            <option value="">Seleccione un miembro</option>
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Fecha de pago"
          type="datetime-local"
          value={payedAt}
          onChange={handlePayedAtChange}
        />
      </div>

      <Button
        disabled={!changed}
        className="self-end px-2 py-1 w-fit"
        color="orange"
      >
        Guardar
      </Button>
    </form>
  );
}
