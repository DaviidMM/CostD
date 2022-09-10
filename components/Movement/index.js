import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteMovement } from '../../services/movements';
import { normalizeLongDate, normalizeShortDate } from '../../utils/dates';
import ModifyMovementForm from '../ModifyMovementForm';

const backgrounds = {
  expense:
    'text-black bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:text-white',
  refund:
    'text-black bg-gradient-to-br from-green-500 via-green-700 to-green-600 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:text-white',
};

export default function Movement({
  amount,
  description,
  id,
  member,
  members,
  onChange,
  onDelete,
  open,
  participants,
  payedAt,
  toggleMovement,
  type,
}) {
  const longDate = normalizeLongDate(payedAt);
  const shortDate = normalizeShortDate(payedAt);

  const memberName = useMemo(() => {
    return members.find((m) => m.id === member).name;
  }, [member, members]);

  const handleClick = () => toggleMovement(id);

  const handleDelete = (movement) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      return;
    }

    const promise = deleteMovement(movement);
    toast
      .promise(promise, {
        success: 'Se ha eliminado el movimiento',
        error: 'Ha ocurrido un error eliminando el movimiento',
        pending: 'Eliminando movimiento...',
      })
      .then(() => onDelete(movement))
      .catch((err) => {
        console.error({ err });
        toast.error(
          err.response.data.error || 'Ha ocurrido un error eliminando el gasto'
        );
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        className={
          `flex flex-row justify-between w-full p-2 rounded-md  duration-300  transition-all ` +
          backgrounds[type]
        }
      >
        <div className="flex flex-col text-left">
          <span>
            <b>{description}</b>
          </span>
          <span className="text-sm">
            Pagado por: <b>{memberName}</b>
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span>
            <b>{amount}€</b>
          </span>
          <span className="hidden text-sm md:block">{longDate}</span>
          <span className="block text-sm md:hidden">{shortDate}</span>
        </div>
      </button>
      <div
        className={
          'transition-all overflow-hidden duration-300 ' +
          (open ? 'max-h-96' : 'max-h-0')
        }
      >
        <div className="h-full p-2 text-black rounded-md bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-800">
          <ModifyMovementForm
            color={
              type === 'expense'
                ? 'orange'
                : type === 'refund'
                ? 'green'
                : 'blue'
            }
            movement={{
              amount,
              description,
              id,
              member,
              participants,
              payedAt,
              type,
            }}
            members={members}
            participants={participants}
            onDelete={handleDelete}
            onUpdate={onChange}
          />
        </div>
      </div>
    </div>
  );
}
