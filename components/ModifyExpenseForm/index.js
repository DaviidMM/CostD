import { useState } from 'react';
import { modifyExpense } from '../../services/expenses';
import Button from '../Button';
import Input from '../Input';
import { toast } from 'react-toastify';

export default function ModifyExpenseForm({ expense, members = [] }) {
  const { id } = expense;
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [member, setMember] = useState(expense.member);
  const [payedAt, setPayedAt] = useState(
    new Date(expense.payedAt).toISOString().split(':').slice(0, -1).join(':')
  );

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

    toast.promise(promise, {
      success: 'Gasto modificado con éxito',
      error: 'Ha ocurrido un error modificando el gasto',
      pending: 'Actualizando gasto...',
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

      <Button className="self-end px-2 py-1 w-fit" color="orange">
        Guardar
      </Button>
    </form>
  );
}
