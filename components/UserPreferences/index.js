import { useState } from 'react';
import { toast } from 'react-toastify';
import useUserPrefs from '../../hooks/useUserPrefs';
import { updateUserPrefs } from '../../services/users';
import SettingCard from '../SettingCard';
import userPreferencesDict from '../../dict/userPreferences';

export default function UserPreferences() {
  const userPrefs = useUserPrefs();

  const [notifications, setNotifications] = useState(true);

  const handleUpdatePref = async ({ preference, value }) => {
    updateUserPrefs({ preference, value })
      .then((res) => {
        if (res.status === 200) toast.success('Preferencias actualizadas 👍');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error al actualizar preferencias');
      });
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(userPreferencesDict).map((pref) => {
        return (
          <SettingCard
            key={pref.preference}
            description={pref.description}
            handleSave={handleUpdatePref}
            preference={pref.preference}
            title={pref.title}
            value={userPrefs[pref.preference]}
          />
        );
      })}

      <SettingCard
        description="Habilitar las notificaciones de actualizaciones en grupos"
        handleSave={handleUpdatePref}
        preference="notifications"
        setValue={setNotifications}
        title="Notificaciones"
        type="toggle"
        value={notifications}
      />
    </div>
  );
}
