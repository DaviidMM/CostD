import { useState } from 'react';
import Button from '../Button';
import Movement from '../Movement';
import NewMovementForm from '../NewMovementForm';

export default function MovementsPanel({
  movements,
  members,
  onMovementUpdate,
}) {
  const [active, setActive] = useState(null);
  const [showNewMovementForm, setShowNewMovementForm] = useState(false);

  const addMovement = (movement) => {
    onMovementUpdate([...movements, movement]);
  };

  const removeMovement = (movement) => {
    onMovementUpdate(movements.filter((e) => e.id !== movement.id));
  };

  const handleChange = (movement) => {
    onMovementUpdate(
      movements.map((e) => (e.id === movement.id ? movement : e))
    );
  };

  const toggleMovement = (movement) => {
    if (active === movement) return setActive(null);
    setActive(movement);
  };

  return (
    <div>
      {showNewMovementForm ? (
        <NewMovementForm
          closeForm={() => setShowNewMovementForm(false)}
          members={members}
          onCreate={addMovement}
        />
      ) : (
        <>
          <ul className="flex flex-col gap-2 mb-4 overflow-y-auto max-h-96">
            {movements.map((movement) => {
              return (
                <Movement
                  key={movement.id}
                  {...movement}
                  members={members}
                  onChange={handleChange}
                  onDelete={removeMovement}
                  open={movement.id === active}
                  toggleMovement={toggleMovement}
                />
              );
            })}
          </ul>
          <Button
            className="mt-4"
            color="orange"
            onClick={() => setShowNewMovementForm(true)}
          >
            💵 Añadir movimiento
          </Button>
        </>
      )}
    </div>
  );
}
