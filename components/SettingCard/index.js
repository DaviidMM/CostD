import { useState } from 'react';
import Switch from '../Switch';

export default function SettingCard({
  description,
  handleSave,
  preference,
  title,
  type,
  value,
  setValue,
}) {
  const handleClick = () => handleSave({ preference, value });

  return (
    <div className="flex flex-col gap-4 overflow-hidden bg-black border-2 border-zinc-500 rounded-xl">
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <div className="flex flex-row gap-2">
          {type === 'toggle' && (
            <Switch
              checked={value}
              description={value ? 'Activado' : 'Desactivado'}
              onChange={() => setValue(!value)}
            />
          )}
        </div>
      </div>
      <footer className="flex flex-row items-center justify-between px-6 py-3 bg-zinc-800 text-zinc-300">
        <div>
          <p>{description}</p>
        </div>
        <button
          className="px-4 py-2 text-black transition-all duration-300 bg-zinc-300 rounded-xl hover:bg-white"
          onClick={handleClick}
          type="button"
        >
          Guardar
        </button>
      </footer>
    </div>
  );
}
