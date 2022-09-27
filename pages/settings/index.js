import { useState } from 'react';
import { BsGearFill } from 'react-icons/bs';
import Switch from '../../components/Switch';

export default function SettigsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h1 className="flex flex-row items-center gap-2 text-5xl">
        <BsGearFill className="w-9 h-9" /> Settings!
      </h1>
      <Switch
        checked={notifications}
        onChange={() => setNotifications(!notifications)}
      />
    </div>
  );
}
