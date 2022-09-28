import { useState } from 'react';
import SettingCard from '../SettingCard';
import Switch from '../Switch';

export default function UserSettings() {
  const [notifications, setNotifications] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <SettingCard
        description="Habilitar las notificaciones de actualizaciones en grupos"
        title="Notificaciones"
      >
        <div className="flex flex-row gap-2">
          <Switch
            checked={notifications}
            description={notifications ? 'Activadas' : 'Desactivadas'}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </SettingCard>
    </div>
  );
}
